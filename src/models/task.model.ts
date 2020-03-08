import mongoose, { Schema, Document } from 'mongoose'

export interface ITask extends Document {
  title: string
  description: string
  complexity: number
  status: string
  createdAt: Date
  modifiedAt: Date
  finishedAt: Date
}

enum Status {
  completed = 'completed',
  inprogress = 'inProgress',
  pendingtobeassigned = 'pendingToBeAssigned',
  discarted = 'discarted'
}

const status = [
  'completed',
  'discarted',
  'inprogress',
  'pendingtobeassigned',
  'discarted'
]

// tslint:disable-next-line: variable-name
const TaskSchema: Schema = new Schema({
  title: String,
  description: String,
  complexity: Number,
  status: {
    type: String,
    enum: status
  },
  createdAt: Date,
  modifiedAt: Date,
  finishedAt: Date
})

export default mongoose.model<ITask>('Task', TaskSchema)
