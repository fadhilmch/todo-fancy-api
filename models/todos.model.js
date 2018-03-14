const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Todo', new Schema ({
    text: {
        type: String, required: true
    },
    due_date: Date,
    starred: Boolean,
    status: Boolean,
    category:[String],
},{
    timestamps: true
}).pre('save', () => {
    if(this.starred != true)
        this.starred = false;
    this.status = false;
}));
