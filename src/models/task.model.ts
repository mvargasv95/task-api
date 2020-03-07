import mongoose, { Schema, Document } from 'mongoose'

enum Status {
  Completed = 'completed',
  InProgress = 'inprogress',
  PendingToBeAssigned = 'pendingtobeassigned',
  Discarted = 'discarted'
}

// tslint:disable-next-line: variable-name
const TaskSchema: Schema = new Schema({
  title: String,
  description: String,
  complexity: Number,
  status: Status,
  createdAt: Date,
  modifiedAt: Date,
  finishedAt: Date
})

export default mongoose.model('Task', TaskSchema)
