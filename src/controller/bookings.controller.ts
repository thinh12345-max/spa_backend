import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException, NotFoundException } from '@nestjs/common';
import { BookingsService } from '../service/bookings.service';
import { CreateBookingDto } from '../dto/bookings/create_booking.dto';
import { UpdateBookingDto } from '../dto/bookings/update_booking.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // ADMIN - Tạo booking (admin tạo hộ customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  // ADMIN & STAFF - Xem tất cả (admin xem tất cả, staff chỉ xem của mình)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Get()
  async findAll(@Req() req: any) {
    if (req.user.role === 'staff') {
      // Staff chỉ xem bookings của mình
      const allBookings = await this.bookingsService.findAll();
      const staffBookings = allBookings.filter(booking => booking.staff?.user?.id === req.user.userId);
      return staffBookings;
    }
    // Admin xem tất cả
    return this.bookingsService.findAll();
  }

  // ADMIN & STAFF - Xem chi tiết (với check quyền)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const booking = await this.bookingsService.findOne(+id);

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Staff chỉ xem được booking của mình
    if (req.user.role === 'staff' && booking.staff?.user?.id !== req.user.userId) {
      throw new ForbiddenException('You can only view your own bookings');
    }

    return booking;
  }

  // ADMIN & STAFF - Cập nhật (với check quyền)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
    @Req() req: any,
  ) {
    const booking = await this.bookingsService.findOne(+id);

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Staff chỉ sửa được booking của mình
    if (req.user.role === 'staff' && booking.staff?.user?.id !== req.user.userId) {
      throw new ForbiddenException('You can only update your own bookings');
    }

    return this.bookingsService.update(+id, updateBookingDto);
  }

  // ADMIN - Xóa booking
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }
}
