import { Body, Controller, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TokenService } from './token.service';
import { RefreshTokenDto } from './dto/create-token.dto';
import { Public } from 'src/auth/auth.public.decorator';

@ApiTags('Tokens')
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Patch('refresh')
  @Public()
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.tokenService.refreshToken(body.token);
  }
}
