import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-b23f9a7d/health", (c) => {
  return c.json({ status: "ok" });
});

// ==========================================================================
// EMPLOYEES ROUTES
// ==========================================================================

// Get all employees
app.get("/make-server-b23f9a7d/employees", async (c) => {
  try {
    const employees = await kv.getByPrefix("employees:");
    return c.json({ success: true, data: employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get single employee by ID
app.get("/make-server-b23f9a7d/employees/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const employee = await kv.get(`employees:${id}`);
    if (!employee) {
      return c.json({ success: false, error: "Employee not found" }, 404);
    }
    return c.json({ success: true, data: employee });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create new employee
app.post("/make-server-b23f9a7d/employees", async (c) => {
  try {
    const employee = await c.req.json();
    await kv.set(`employees:${employee.id}`, employee);
    return c.json({ success: true, data: employee });
  } catch (error) {
    console.error("Error creating employee:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update employee
app.put("/make-server-b23f9a7d/employees/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const employee = await c.req.json();
    await kv.set(`employees:${id}`, employee);
    return c.json({ success: true, data: employee });
  } catch (error) {
    console.error("Error updating employee:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete employee
app.delete("/make-server-b23f9a7d/employees/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`employees:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==========================================================================
// DIVISIONS ROUTES
// ==========================================================================

// Get all divisions
app.get("/make-server-b23f9a7d/divisions", async (c) => {
  try {
    const divisions = await kv.getByPrefix("divisions:");
    return c.json({ success: true, data: divisions });
  } catch (error) {
    console.error("Error fetching divisions:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create new division
app.post("/make-server-b23f9a7d/divisions", async (c) => {
  try {
    const division = await c.req.json();
    await kv.set(`divisions:${division.id}`, division);
    return c.json({ success: true, data: division });
  } catch (error) {
    console.error("Error creating division:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update division
app.put("/make-server-b23f9a7d/divisions/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const division = await c.req.json();
    await kv.set(`divisions:${id}`, division);
    return c.json({ success: true, data: division });
  } catch (error) {
    console.error("Error updating division:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete division
app.delete("/make-server-b23f9a7d/divisions/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`divisions:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting division:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==========================================================================
// NATURA ROUTES
// ==========================================================================

// Get all natura data
app.get("/make-server-b23f9a7d/natura", async (c) => {
  try {
    const natura = await kv.getByPrefix("natura:");
    return c.json({ success: true, data: natura });
  } catch (error) {
    console.error("Error fetching natura:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create/Update natura
app.post("/make-server-b23f9a7d/natura", async (c) => {
  try {
    const natura = await c.req.json();
    await kv.set(`natura:${natura.id}`, natura);
    return c.json({ success: true, data: natura });
  } catch (error) {
    console.error("Error saving natura:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update natura
app.put("/make-server-b23f9a7d/natura/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const natura = await c.req.json();
    await kv.set(`natura:${id}`, natura);
    return c.json({ success: true, data: natura });
  } catch (error) {
    console.error("Error updating natura:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==========================================================================
// TAX BRACKETS ROUTES
// ==========================================================================

// Get all tax brackets
app.get("/make-server-b23f9a7d/tax-brackets", async (c) => {
  try {
    const taxBrackets = await kv.getByPrefix("tax-brackets:");
    return c.json({ success: true, data: taxBrackets });
  } catch (error) {
    console.error("Error fetching tax brackets:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create/Update tax bracket
app.post("/make-server-b23f9a7d/tax-brackets", async (c) => {
  try {
    const taxBracket = await c.req.json();
    await kv.set(`tax-brackets:${taxBracket.id}`, taxBracket);
    return c.json({ success: true, data: taxBracket });
  } catch (error) {
    console.error("Error saving tax bracket:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==========================================================================
// BPJS RATES ROUTES
// ==========================================================================

// Get all BPJS rates
app.get("/make-server-b23f9a7d/bpjs-rates", async (c) => {
  try {
    const bpjsRates = await kv.getByPrefix("bpjs-rates:");
    return c.json({ success: true, data: bpjsRates });
  } catch (error) {
    console.error("Error fetching BPJS rates:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create/Update BPJS rate
app.post("/make-server-b23f9a7d/bpjs-rates", async (c) => {
  try {
    const bpjsRate = await c.req.json();
    await kv.set(`bpjs-rates:${bpjsRate.id}`, bpjsRate);
    return c.json({ success: true, data: bpjsRate });
  } catch (error) {
    console.error("Error saving BPJS rate:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==========================================================================
// SEED DATA ROUTE
// ==========================================================================

// Initialize database with seed data
app.post("/make-server-b23f9a7d/seed-data", async (c) => {
  try {
    const { employees, divisions, natura, taxBrackets, bpjsRates } = await c.req.json();
    
    // Seed employees
    if (employees && Array.isArray(employees)) {
      for (const employee of employees) {
        await kv.set(`employees:${employee.id}`, employee);
      }
      console.log(`Seeded ${employees.length} employees`);
    }
    
    // Seed divisions
    if (divisions && Array.isArray(divisions)) {
      for (const division of divisions) {
        await kv.set(`divisions:${division.id}`, division);
      }
      console.log(`Seeded ${divisions.length} divisions`);
    }
    
    // Seed natura
    if (natura && Array.isArray(natura)) {
      for (const nat of natura) {
        await kv.set(`natura:${nat.id}`, nat);
      }
      console.log(`Seeded ${natura.length} natura records`);
    }
    
    // Seed tax brackets
    if (taxBrackets && Array.isArray(taxBrackets)) {
      for (const bracket of taxBrackets) {
        await kv.set(`tax-brackets:${bracket.id}`, bracket);
      }
      console.log(`Seeded ${taxBrackets.length} tax brackets`);
    }
    
    // Seed BPJS rates
    if (bpjsRates && Array.isArray(bpjsRates)) {
      for (const rate of bpjsRates) {
        await kv.set(`bpjs-rates:${rate.id}`, rate);
      }
      console.log(`Seeded ${bpjsRates.length} BPJS rates`);
    }
    
    return c.json({ 
      success: true, 
      message: "Database seeded successfully",
      counts: {
        employees: employees?.length || 0,
        divisions: divisions?.length || 0,
        natura: natura?.length || 0,
        taxBrackets: taxBrackets?.length || 0,
        bpjsRates: bpjsRates?.length || 0,
      }
    });
  } catch (error) {
    console.error("Error seeding data:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);