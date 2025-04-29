import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './src/app/user/user.module';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { OrderModule } from './app/order/order.module';
import { CartModule } from './app/cart/cart.module';
import { ProductModule } from './app/product/product.module';
import { UserModule } from './app/user/user.module';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [UserModule, ProductModule, CartModule, OrderModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
