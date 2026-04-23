import { NextResponse } from "next/server";

// In a real application, this would connect to the database (Prisma)
const mockReminders = [
  { id: "1", title: "Registration Deadline", date: "2026-10-10" },
  { id: "2", title: "Election Day", date: "2026-11-05" }
];

export async function GET() {
  return NextResponse.json({ reminders: mockReminders });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newReminder = {
      id: Date.now().toString(),
      title: data.title || "New Reminder",
      date: data.date || new Date().toISOString().split('T')[0]
    };
    
    // Normally we'd push to DB here
    mockReminders.push(newReminder);
    
    return NextResponse.json({ success: true, reminder: newReminder });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create reminder" }, { status: 500 });
  }
}
