import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const dbName = mongoose.connection.name || 'swarn_bharat_one';

    return NextResponse.json(
      {
        success: true,
        database: dbName,
        message: 'MongoDB connected successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    const sanitizedMessage = error.message
      ? error.message.replace(/mongodb(\+srv)?:\/\/[^\s]+/gi, '[REDACTED_URI]')
      : 'Failed to connect to MongoDB';

    return NextResponse.json(
      {
        success: false,
        error: 'Database connection failed',
        message: sanitizedMessage,
      },
      { status: 500 }
    );
  }
}
