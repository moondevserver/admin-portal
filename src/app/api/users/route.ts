import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const db = getDatabase("users");
    
    return new Promise((resolve, reject) => {
      db.find({}, (err: Error | null, users: any[]) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(NextResponse.json(users));
      });
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = getDatabase("users");
    
    const newUser = {
      id: uuidv4(),
      ...body,
      emailVerified: null,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    return new Promise((resolve, reject) => {
      db.insert(newUser, (err: Error | null, user: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(NextResponse.json(user));
      });
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
} 