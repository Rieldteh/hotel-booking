const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class RegisterService {
    async register(email, password, name) {
        try {
            const user = await prisma.user.findUnique({
                where: {email}
            });

            if (user) {
                return { statusCode: 404, result: null, message: `User ${email} is already exist` };
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await prisma.user.create({
                data: {
                  email,
                  password: hashedPassword,
                  name
                }
              });

            return { statusCode: 200, result: newUser, message: `Successful add user "${email}" to the database` };

        } catch(err) {
            return { statusCode: 500, result: null, message: `Server error: ${err}` };
        }
    }

    async login(email, password) {
        try {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return { statusCode: 400, result: null, message: 'Invalid credentials' };
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
            return { statusCode: 200, result: token, message: 'User has logged in' };

        } catch(err) {
            return { statusCode: 500, result: null, message: `Server error: ${err}` };
        }
    }

}

module.exports = new RegisterService();