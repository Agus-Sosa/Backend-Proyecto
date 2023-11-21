export class ContactDto {
    constructor(contact){
        this.first_name = contact.first_name;
        this.last_name = contact.last_name || '';
        this.fullName = `${contact.first_name} ${contact.last_name}`;
        this.email = contact.email;
        this.age = contact.age;
        this.cart = contact.cart;
        this.role = contact.role;
        this.password = contact.password;
    };
};