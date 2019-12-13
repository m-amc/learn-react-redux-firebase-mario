import React from 'react';
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom'

export default function ProjectList({ projects }) {
  return (
    <div className='project-list section'>
      {
        // If there is a projects, then cycle through the projects
        projects && projects.map(project => {
          return (
            <Link to={`/project/${project.id}`} key={project.id}>
              <ProjectSummary project=
                {project} />
            </Link>
          )
        })
      }
    </div>
  )
}
