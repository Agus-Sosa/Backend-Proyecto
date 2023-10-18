import { TicketsService } from "../Services/tickets.service.js";
import { CartService } from "../Services/carts.service.js";
import { ProductService } from "../Services/product.service.js";
import { logger } from "../helpers/logger.js";

export class ticketController {
  static async createTicket(req, res) {
    try {
      logger.info("Creando ticket para la compra");
      const cartId = req.params.cid;
      const cart = await CartService.getCartById(cartId);
      const productsInCart = cart.products;

      const productsProcessed = [];
      const productsOutOfStock = [];

      for (const productInCart of productsInCart) {
        const productId = productInCart.product;
        const quantity = productInCart.quantity;

        const product = await ProductService.getProductId(productId);
        if (!product) {
          return res
            .status(404)
            .json({ error: `El producto con ID ${productId} no existe` });
        }
        if (product.stock > 0 && product.stock >= quantity) {
          productsProcessed.push(productId);
          product.stock -= quantity;
          await product.save();
        } else {
          productsOutOfStock.push(productId);
        }
      }

      const totalPricePromises = productsProcessed.map(async (productId) => {
        const productInCart = productsInCart.find(
          (p) => p.product === productId
        );
        const product = await ProductService.getProductId(productId);

        if (productInCart && product) {
          return productInCart.quantity * product.price;
        } else {
          return 0;
        }
      });

      const totalPriceArray = await Promise.all(totalPricePromises);

      const totalPrice = totalPriceArray.reduce(
        (total, price) => total + price,
        0
      );
      for (const productId of productsOutOfStock) {
        await CartService.addProductToCart(cartId, productId._id);
      }

      const purchaserUser = req.user.email;

      const newTicket = {
        amount: totalPrice,
        purchaser: purchaserUser,
      };

      const ticket = await TicketsService.createTicket(newTicket);

      const ticketProcessed = {
        code: ticket.code,
        purchase_datetime: ticket.purchase_datetime,
        amount: totalPrice,
        purchaser: purchaserUser,
      };

      return res.status(200).json({
        message: "Compra finalizada correctamente.",
        ticket: ticketProcessed,
      });
    } catch (error) {
      logger.error(`Error al crear el ticket ${error}`);
      res
        .status(404)
        .json({ error: `Error al finalizar la compra: ${error.message}` });
    }
  }
}
