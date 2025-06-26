"use client"
import { useState, useEffect } from "react"
import ProjectCard from "./Project-card"
import { type RealEstateProject } from "@/lib/type"
import { Skeleton } from "../ui/skeleton"

const FeaturedProjects = () => {
  const [projects, setProjects] = useState<RealEstateProject[]>([])
  const [loading, setLoading] = useState<boolean>(true)

    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/projects")

        if (!response.ok) {
          throw new Error(`Error Status: ${response.status} - ${response.statusText || "Unknown error"}`)
        }

        const result = await response.json()
        console.log("API response:", result)
        // Transform the API response to match our expected type if needed
        const formattedProjects = result.map((project: any) => ({
          ...project,
          // Ensure nearbyFacilities is an array
          nearbyFacilities: Array.isArray(project.nearbyFacilities)
            ? project.nearbyFacilities
            : project.nearbyFacilities
              ? [project.nearbyFacilities]
              : [],
          // Add other transformations as needed
        }))

        // Use the projects from the API or fallback to mock data if empty
        if (formattedProjects && formattedProjects.length > 0) {
          setProjects(formattedProjects)
        } else {
          console.log("No projects found in API, using mock data")
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
        // Fallback to mock data on error
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()

  // Skeleton loading state
  if (loading) {
    return (
      <div>
        <div className="px-6 py-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Featured Projects</h2>
        </div>
        <div className="p-4 mx-auto">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="px-6 py-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Featured Projects</h2>
      </div>
      <div className="p-4 mx-auto">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedProjects
