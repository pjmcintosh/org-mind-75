import { readdirSync, statSync } from "fs"
import { join } from "path"
import { sidebarConfig } from "@/config/sidebar-config"

function getAllPageRoutes(dir: string, basePath = ""): string[] {
  const routes: string[] = []
  const items = readdirSync(dir)

  for (const item of items) {
    const fullPath = join(dir, item)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      // Handle dynamic routes like [id]
      if (item.startsWith("[") && item.endsWith("]")) {
        const paramName = item.slice(1, -1)
        routes.push(`${basePath}/${item}`)
      } else {
        routes.push(...getAllPageRoutes(fullPath, `${basePath}/${item}`))
      }
    } else if (item === "page.tsx" || item === "route.ts") {
      routes.push(basePath || "/")
    }
  }

  return routes
}

export function validateSidebarRoutes(): void {
  try {
    // Get all configured routes from sidebar
    const configuredRoutes = Object.values(sidebarConfig)
      .flatMap((group) => group.items.map((item) => item.path))
      .sort()

    // Get all actual page routes
    const appDir = join(process.cwd(), "app")
    const actualRoutes = getAllPageRoutes(appDir)
      .filter((route) => !route.includes("api/")) // Exclude API routes
      .sort()

    console.log("\n=== Sidebar Route Validation ===")
    console.log(`Configured routes: ${configuredRoutes.length}`)
    console.log(`Actual page routes: ${actualRoutes.length}`)

    // Find unlinked routes (pages not in sidebar)
    const unlinkedRoutes = actualRoutes.filter(
      (route) => !configuredRoutes.includes(route) && !route.includes("[id]"), // Exclude dynamic routes for now
    )

    // Find broken links (sidebar routes that don't exist)
    const brokenLinks = configuredRoutes.filter(
      (route) =>
        !actualRoutes.some(
          (actualRoute) => actualRoute === route || (route.includes("/[id]") && actualRoute.includes("[id]")),
        ),
    )

    if (unlinkedRoutes.length > 0) {
      console.log("\n⚠️  Unlinked routes (pages not in sidebar):")
      unlinkedRoutes.forEach((route) => console.log(`  - ${route}`))
    }

    if (brokenLinks.length > 0) {
      console.log("\n❌ Broken links (sidebar routes that don't exist):")
      brokenLinks.forEach((route) => console.log(`  - ${route}`))
    }

    if (unlinkedRoutes.length === 0 && brokenLinks.length === 0) {
      console.log("\n✅ All routes are properly configured!")
    }

    console.log("\n=== End Validation ===\n")
  } catch (error) {
    console.error("Error validating sidebar routes:", error)
  }
}

// Run validation if this file is executed directly
if (require.main === module) {
  validateSidebarRoutes()
}
