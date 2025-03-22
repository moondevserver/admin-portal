import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/db/schema";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const db = getDatabase("users");
    
    return new Promise((resolve, reject) => {
      db.findOne({ id: params.id }, (err: Error | null, user: any) => {
        if (err) {
          reject(err);
          return;
        }
        if (!user) {
          resolve(NextResponse.json(
            { error: "User not found" },
            { status: 404 }
          ));
          return;
        }
        resolve(NextResponse.json(user));
      });
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const body = await request.json();
    const db = getDatabase("users");
    
    return new Promise((resolve, reject) => {
      db.update(
        { id: params.id },
        { $set: body },
        { returnUpdatedDocs: true },
        (err: Error | null, numAffected: number, user: any) => {
          if (err) {
            reject(err);
            return;
          }
          if (numAffected === 0) {
            resolve(NextResponse.json(
              { error: "User not found" },
              { status: 404 }
            ));
            return;
          }
          resolve(NextResponse.json(user));
        }
      );
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const db = getDatabase("users");
    
    return new Promise((resolve, reject) => {
      db.remove({ id: params.id }, {}, (err: Error | null, numRemoved: number) => {
        if (err) {
          reject(err);
          return;
        }
        if (numRemoved === 0) {
          resolve(NextResponse.json(
            { error: "User not found" },
            { status: 404 }
          ));
          return;
        }
        resolve(NextResponse.json({ success: true }));
      });
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
} 