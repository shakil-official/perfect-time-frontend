import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(NextRequest) {

    console.log(NextRequest)

}