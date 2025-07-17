import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // ใช้สำหรับเข้ารหัสผ่าน

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin'], // กำหนด role เช่น admin, superadmin
    default: 'admin',
  },
}, { timestamps: true });

// เข้ารหัส password ก่อนบันทึกลงฐานข้อมูล
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method สำหรับเปรียบเทียบรหัสผ่าน
AdminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('Admin', AdminSchema);