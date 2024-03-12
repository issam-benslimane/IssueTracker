package com.jira.api.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Issue {
    @Id
    @GeneratedValue
    private Long id;

    private String summary;

    private String description;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Integer estimate;

    private Integer timeSpent;

    private Integer timeRemaining;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User reporter;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "ASSIGNEE_ISSUE",
            joinColumns = @JoinColumn(name = "ISSUE_ID"),
            inverseJoinColumns = @JoinColumn(name = "ASSIGNEE_ID")
    )
    private Set<User> assignees = new HashSet<>();

    public Issue(Project project, User reporter, String summary, String description, Type type, Priority priority, Status status, Integer estimate, Integer timeSpent, Integer timeRemaining) {
        this.summary = summary;
        this.description = description;
        this.type = type;
        this.priority = priority;
        this.status = status;
        this.estimate = estimate;
        this.timeSpent = timeSpent;
        this.timeRemaining = timeRemaining;
        this.project = project;
        this.reporter = reporter;
    }

    public Issue() {
    }

    public Long getId() {
        return id;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getEstimate() {
        return estimate;
    }

    public void setEstimate(Integer estimate) {
        this.estimate = estimate;
    }

    public Integer getTimeSpent() {
        return timeSpent;
    }

    public void setTimeSpent(Integer timeSpent) {
        this.timeSpent = timeSpent;
    }

    public Integer getTimeRemaining() {
        return timeRemaining;
    }

    public void setTimeRemaining(Integer timeRemaining) {
        this.timeRemaining = timeRemaining;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getReporter() {
        return reporter;
    }

    public void setReporter(User reporter) {
        this.reporter = reporter;
    }

    public Set<User> getAssignees() {
        return assignees;
    }

    public void setAssignees(Set<User> assignees) {
        this.assignees = assignees;
    }

    public enum Type{
        BUG, STORY, TASK
    }

    public enum Priority{
        HIGHEST, HIGH, MEDIUM, LOW, LOWEST
    }

    public enum Status{
        BACKLOG, SELECTED_FOR_DEVELOPMENT, IN_PROGRESS, DONE
    }
}
