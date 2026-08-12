import User from "@/models/User";
import { hashPassword } from "@/lib/auth";

export async function ensureTestAccounts() {
  try {
    const testAccounts = [
      {
        email: "student@campus.edu",
        password: "student123",
        name: "Demo Student",
        role: "student",
        department: "Computer Science",
        rollNumber: "CS202601",
      },
      {
        email: "faculty@campus.edu",
        password: "faculty123",
        name: "Prof. Alan Turing",
        role: "faculty",
        department: "Computer Science",
      },
      {
        email: "coordinator@campus.edu",
        password: "coord123",
        name: "Events & Placement Coordinator",
        role: "coordinator",
        department: "Student Affairs & Placements",
      },
      {
        email: "admin@campus.edu",
        password: "admin123",
        name: "System Administrator",
        role: "admin",
        department: "Administration",
      },
    ];

    for (const acc of testAccounts) {
      const existing = await User.findOne({ email: acc.email.toLowerCase() });
      if (!existing) {
        const hashedPassword = await hashPassword(acc.password);
        await User.create({
          email: acc.email.toLowerCase(),
          password: hashedPassword,
          name: acc.name,
          role: acc.role,
          department: acc.department,
          rollNumber: acc.rollNumber || undefined,
        });
      }
    }
  } catch (err) {
    console.error("Failed to seed test accounts:", err);
  }
}
