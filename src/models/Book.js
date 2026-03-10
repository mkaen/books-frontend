export class Book {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.author = data.author
        this.description = data.description
        this.img = data.imageUrl
        this.reserved = data.reserved
        this.lentOut = data.lentOut
        this.isActive = data.active
        this.ownerId = data.ownerId
        this.lenderId = data.lenderId
        this.returnDate = data.returnDate ? new Date(data.returnDate) : null
        this.isOverdue = data.isOverdue
    }
}