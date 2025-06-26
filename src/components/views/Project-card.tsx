"use client"
import type { Project } from "@/lib/type"
import type React from "react"

import { Building2, Calendar, MapPin, Home, Phone } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface ProjectCardProps {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Format dates for display
  // Get the first available unit type or default
  const unitType = project.availableUnits.length > 0 ? project.availableUnits[0] : "Units"

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 bg-gradient-to-r from-blue-100 to-blue-50">
        {project.siteImagesVideos.length > 0 ? (
          <Image
            src={project.siteImagesVideos[0] || "/placeholder.svg"}
            alt={project.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Building2 className="w-16 h-16 text-blue-300" />
          </div>
        )}
        <Badge className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700">{project.projectStatus}</Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold line-clamp-1">{project.name}</h3>
            <p className="text-sm text-muted-foreground">{project.developerName}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-2">
        <div className="flex items-center text-sm">
          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
          <span className="line-clamp-1">
            {project.area}, {project.city}
          </span>
        </div>

        <div className="flex items-center text-sm">
          <Home className="w-4 h-4 mr-2 text-blue-500" />
          <span>
            {project.projectType} • {unitType}
          </span>
        </div>
{/* 
        <div className="flex items-center text-sm">
          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
          <span>Completion: {project}</span>
        </div> */}

        <div className="flex items-center text-sm">
          <Phone className="w-4 h-4 mr-2 text-blue-500" />
          <span>{project.developerPhone}</span>
        </div>

        {project.luxuryFeatures.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {project.luxuryFeatures.map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm">
          Details
        </Button>
        <Button size="sm">Contact</Button>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard
