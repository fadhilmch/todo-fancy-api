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
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
},{
    timestamps: true
}).pre('save', () => {
    this.starred = false;
    this.status = false;
}));
