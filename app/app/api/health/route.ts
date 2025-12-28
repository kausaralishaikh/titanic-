import { NextResponse } from "next/server"
import { existsSync } from "fs"
import { join } from "path"

export async function GET() {
  const health = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "Titanic Fairness Audit API",
    version: "1.0.0",
    checks: {
      api: "ok",
      model: existsSync(join(process.cwd(), "ml/models/model.pkl")) ? "ok" : "missing",
      data: existsSync(join(process.cwd(), "data")) ? "ok" : "missing",
    },
  }

  const allHealthy = Object.values(health.checks).every((status) => status === "ok")

  return NextResponse.json(health, {
    status: allHealthy ? 200 : 503,
  })
}
