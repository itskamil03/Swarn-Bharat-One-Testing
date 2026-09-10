import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src", "data", "careerApplications.json");
const ADMIN_DATA_FILE = path.join(process.cwd(), "..", "Swarn-Bharat-One-Admin", "data", "careerApplications.json");

function getApplications() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading applications:", err);
  }
  return [];
}

function saveApplications(apps) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(apps, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing to website data file:", err);
  }

  try {
    const adminDir = path.dirname(ADMIN_DATA_FILE);
    if (fs.existsSync(adminDir)) {
      fs.writeFileSync(ADMIN_DATA_FILE, JSON.stringify(apps, null, 2), "utf8");
    }
  } catch (err) {
    console.error("Error syncing to admin data file:", err);
  }
}

export async function GET() {
  const apps = getApplications();
  return NextResponse.json({ success: true, applications: apps });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, email, phone, category, position, message, resumeName, resumeUrl } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json({ success: false, error: "Name, email, and phone are required." }, { status: 400 });
    }

    const newApp = {
      id: `app-${Date.now().toString().slice(-4)}`,
      name: fullName,
      email,
      phone,
      category: category || "Technology",
      position: position || "General Application",
      experience: "Candidate Submission",
      currentLocation: "India",
      resumeName: resumeName || "Resume_Document.pdf",
      portfolioUrl: "",
      appliedDate: new Date().toISOString().split("T")[0],
      stage: "Applied",
      notes: message ? `Candidate Cover Note: "${message}"` : "New application received via website.",
      resumeUrl: resumeUrl || "#",
    };

    const currentApps = getApplications();
    const updated = [newApp, ...currentApps];
    saveApplications(updated);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully! Our talent team will reach out soon.",
      application: newApp,
    });
  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
