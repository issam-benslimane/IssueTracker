package com.jira.api.controller;

import com.jira.api.model.Issue;
import com.jira.api.model.Project;
import com.jira.api.repository.IssueRepository;
import com.jira.api.repository.ProjectRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/projects")
public class ProjectController {
    private ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping
    public List<Project> getProjects(){
        return projectRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable("id") Long id){
        Optional<Project> project = projectRepository.findById(id);
        return project.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/issues}")
    public ResponseEntity<Iterable<Issue>> getProjectIssues(@PathVariable("id") Long id){
        Optional<Project> project = projectRepository.findById(id);
        if (project.isPresent()) return ResponseEntity.ok(project.get().getIssues());
        return ResponseEntity.notFound().build();
    }
}
