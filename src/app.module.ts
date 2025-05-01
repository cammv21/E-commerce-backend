import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { OrderModule } from './app/order/order.module';
import { CartModule } from './app/cart/cart.module';
import { ProductModule } from './app/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configOptions } from './app/config/config-options';


@Module({
  imports: [
    UserModule, 
    ProductModule, 
    CartModule, 
    OrderModule, 
    AuthModule,
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoConfig = configService.get('mongo');
        return { 
          uri: mongoConfig.uri 
        };
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
