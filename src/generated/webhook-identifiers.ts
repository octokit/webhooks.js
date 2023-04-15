import { WebhookEventDefinition } from "../types";

export type webhooksIdentifiers = {
  branch_protection_rule:
    | WebhookEventDefinition<"branch-protection-rule-created">
    | WebhookEventDefinition<"branch-protection-rule-deleted">
    | WebhookEventDefinition<"branch-protection-rule-edited">;
  check_run:
    | WebhookEventDefinition<"check-run-completed">
    | WebhookEventDefinition<"check-run-created">
    | WebhookEventDefinition<"check-run-requested-action">
    | WebhookEventDefinition<"check-run-rerequested">;
  check_suite:
    | WebhookEventDefinition<"check-suite-completed">
    | WebhookEventDefinition<"check-suite-requested">
    | WebhookEventDefinition<"check-suite-rerequested">;
  code_scanning_alert:
    | WebhookEventDefinition<"code-scanning-alert-appeared-in-branch">
    | WebhookEventDefinition<"code-scanning-alert-closed-by-user">
    | WebhookEventDefinition<"code-scanning-alert-created">
    | WebhookEventDefinition<"code-scanning-alert-fixed">
    | WebhookEventDefinition<"code-scanning-alert-reopened">
    | WebhookEventDefinition<"code-scanning-alert-reopened-by-user">;
  commit_comment: WebhookEventDefinition<"commit-comment-created">;
  dependabot_alert:
    | WebhookEventDefinition<"dependabot-alert-created">
    | WebhookEventDefinition<"dependabot-alert-dismissed">
    | WebhookEventDefinition<"dependabot-alert-fixed">
    | WebhookEventDefinition<"dependabot-alert-reintroduced">
    | WebhookEventDefinition<"dependabot-alert-reopened">;
  deploy_key:
    | WebhookEventDefinition<"deploy-key-created">
    | WebhookEventDefinition<"deploy-key-deleted">;
  deployment: WebhookEventDefinition<"deployment-created">;
  deployment_status: WebhookEventDefinition<"deployment-status-created">;
  discussion:
    | WebhookEventDefinition<"discussion-answered">
    | WebhookEventDefinition<"discussion-category-changed">
    | WebhookEventDefinition<"discussion-created">
    | WebhookEventDefinition<"discussion-deleted">
    | WebhookEventDefinition<"discussion-edited">
    | WebhookEventDefinition<"discussion-labeled">
    | WebhookEventDefinition<"discussion-locked">
    | WebhookEventDefinition<"discussion-pinned">
    | WebhookEventDefinition<"discussion-transferred">
    | WebhookEventDefinition<"discussion-unanswered">
    | WebhookEventDefinition<"discussion-unlabeled">
    | WebhookEventDefinition<"discussion-unlocked">
    | WebhookEventDefinition<"discussion-unpinned">;
  discussion_comment:
    | WebhookEventDefinition<"discussion-comment-created">
    | WebhookEventDefinition<"discussion-comment-deleted">
    | WebhookEventDefinition<"discussion-comment-edited">;
  github_app_authorization: WebhookEventDefinition<"github-app-authorization-revoked">;
  installation:
    | WebhookEventDefinition<"installation-created">
    | WebhookEventDefinition<"installation-deleted">
    | WebhookEventDefinition<"installation-new-permissions-accepted">
    | WebhookEventDefinition<"installation-suspend">
    | WebhookEventDefinition<"installation-unsuspend">;
  installation_repositories:
    | WebhookEventDefinition<"installation-repositories-added">
    | WebhookEventDefinition<"installation-repositories-removed">;
  installation_target: WebhookEventDefinition<"installation-target-renamed">;
  issue_comment:
    | WebhookEventDefinition<"issue-comment-created">
    | WebhookEventDefinition<"issue-comment-deleted">
    | WebhookEventDefinition<"issue-comment-edited">;
  issues:
    | WebhookEventDefinition<"issues-assigned">
    | WebhookEventDefinition<"issues-closed">
    | WebhookEventDefinition<"issues-deleted">
    | WebhookEventDefinition<"issues-demilestoned">
    | WebhookEventDefinition<"issues-edited">
    | WebhookEventDefinition<"issues-labeled">
    | WebhookEventDefinition<"issues-locked">
    | WebhookEventDefinition<"issues-milestoned">
    | WebhookEventDefinition<"issues-opened">
    | WebhookEventDefinition<"issues-pinned">
    | WebhookEventDefinition<"issues-reopened">
    | WebhookEventDefinition<"issues-transferred">
    | WebhookEventDefinition<"issues-unassigned">
    | WebhookEventDefinition<"issues-unlabeled">
    | WebhookEventDefinition<"issues-unlocked">
    | WebhookEventDefinition<"issues-unpinned">;
  label:
    | WebhookEventDefinition<"label-created">
    | WebhookEventDefinition<"label-deleted">
    | WebhookEventDefinition<"label-edited">;
  marketplace_purchase:
    | WebhookEventDefinition<"marketplace-purchase-cancelled">
    | WebhookEventDefinition<"marketplace-purchase-changed">
    | WebhookEventDefinition<"marketplace-purchase-pending-change">
    | WebhookEventDefinition<"marketplace-purchase-pending-change-cancelled">
    | WebhookEventDefinition<"marketplace-purchase-purchased">;
  member:
    | WebhookEventDefinition<"member-added">
    | WebhookEventDefinition<"member-edited">
    | WebhookEventDefinition<"member-removed">;
  membership:
    | WebhookEventDefinition<"membership-added">
    | WebhookEventDefinition<"membership-removed">;
  merge_group: WebhookEventDefinition<"merge-group-checks-requested">;
  meta: WebhookEventDefinition<"meta-deleted">;
  milestone:
    | WebhookEventDefinition<"milestone-closed">
    | WebhookEventDefinition<"milestone-created">
    | WebhookEventDefinition<"milestone-deleted">
    | WebhookEventDefinition<"milestone-edited">
    | WebhookEventDefinition<"milestone-opened">;
  org_block:
    | WebhookEventDefinition<"org-block-blocked">
    | WebhookEventDefinition<"org-block-unblocked">;
  organization:
    | WebhookEventDefinition<"organization-deleted">
    | WebhookEventDefinition<"organization-member-added">
    | WebhookEventDefinition<"organization-member-invited">
    | WebhookEventDefinition<"organization-member-removed">
    | WebhookEventDefinition<"organization-renamed">;
  package:
    | WebhookEventDefinition<"package-published">
    | WebhookEventDefinition<"package-updated">;
  project:
    | WebhookEventDefinition<"project-closed">
    | WebhookEventDefinition<"project-created">
    | WebhookEventDefinition<"project-deleted">
    | WebhookEventDefinition<"project-edited">
    | WebhookEventDefinition<"project-reopened">;
  project_card:
    | WebhookEventDefinition<"project-card-converted">
    | WebhookEventDefinition<"project-card-created">
    | WebhookEventDefinition<"project-card-deleted">
    | WebhookEventDefinition<"project-card-edited">
    | WebhookEventDefinition<"project-card-moved">;
  project_column:
    | WebhookEventDefinition<"project-column-created">
    | WebhookEventDefinition<"project-column-deleted">
    | WebhookEventDefinition<"project-column-edited">
    | WebhookEventDefinition<"project-column-moved">;
  projects_v2_item:
    | WebhookEventDefinition<"projects-v2-item-archived">
    | WebhookEventDefinition<"projects-v2-item-converted">
    | WebhookEventDefinition<"projects-v2-item-created">
    | WebhookEventDefinition<"projects-v2-item-deleted">
    | WebhookEventDefinition<"projects-v2-item-edited">
    | WebhookEventDefinition<"projects-v2-item-reordered">
    | WebhookEventDefinition<"projects-v2-item-restored">;
  pull_request:
    | WebhookEventDefinition<"pull-request-assigned">
    | WebhookEventDefinition<"pull-request-auto-merge-disabled">
    | WebhookEventDefinition<"pull-request-auto-merge-enabled">
    | WebhookEventDefinition<"pull-request-closed">
    | WebhookEventDefinition<"pull-request-converted-to-draft">
    | WebhookEventDefinition<"pull-request-demilestoned">
    | WebhookEventDefinition<"pull-request-dequeued">
    | WebhookEventDefinition<"pull-request-edited">
    | WebhookEventDefinition<"pull-request-labeled">
    | WebhookEventDefinition<"pull-request-locked">
    | WebhookEventDefinition<"pull-request-opened">
    | WebhookEventDefinition<"pull-request-ready-for-review">
    | WebhookEventDefinition<"pull-request-reopened">
    | WebhookEventDefinition<"pull-request-review-requested">
    | WebhookEventDefinition<"pull-request-review-request-removed">
    | WebhookEventDefinition<"pull-request-synchronize">
    | WebhookEventDefinition<"pull-request-unassigned">
    | WebhookEventDefinition<"pull-request-unlabeled">
    | WebhookEventDefinition<"pull-request-unlocked">;
  pull_request_review:
    | WebhookEventDefinition<"pull-request-review-dismissed">
    | WebhookEventDefinition<"pull-request-review-edited">
    | WebhookEventDefinition<"pull-request-review-submitted">;
  pull_request_review_comment:
    | WebhookEventDefinition<"pull-request-review-comment-created">
    | WebhookEventDefinition<"pull-request-review-comment-deleted">
    | WebhookEventDefinition<"pull-request-review-comment-edited">;
  pull_request_review_thread:
    | WebhookEventDefinition<"pull-request-review-thread-resolved">
    | WebhookEventDefinition<"pull-request-review-thread-unresolved">;
  push: WebhookEventDefinition<"push">;
  registry_package:
    | WebhookEventDefinition<"registry-package-published">
    | WebhookEventDefinition<"registry-package-updated">;
  release:
    | WebhookEventDefinition<"release-created">
    | WebhookEventDefinition<"release-deleted">
    | WebhookEventDefinition<"release-edited">
    | WebhookEventDefinition<"release-prereleased">
    | WebhookEventDefinition<"release-published">
    | WebhookEventDefinition<"release-released">
    | WebhookEventDefinition<"release-unpublished">;
  repository:
    | WebhookEventDefinition<"repository-archived">
    | WebhookEventDefinition<"repository-created">
    | WebhookEventDefinition<"repository-deleted">
    | WebhookEventDefinition<"repository-edited">
    | WebhookEventDefinition<"repository-privatized">
    | WebhookEventDefinition<"repository-publicized">
    | WebhookEventDefinition<"repository-renamed">
    | WebhookEventDefinition<"repository-transferred">
    | WebhookEventDefinition<"repository-unarchived">;
  repository_vulnerability_alert:
    | WebhookEventDefinition<"repository-vulnerability-alert-create">
    | WebhookEventDefinition<"repository-vulnerability-alert-dismiss">
    | WebhookEventDefinition<"repository-vulnerability-alert-reopen">
    | WebhookEventDefinition<"repository-vulnerability-alert-resolve">;
  secret_scanning_alert:
    | WebhookEventDefinition<"secret-scanning-alert-created">
    | WebhookEventDefinition<"secret-scanning-alert-reopened">
    | WebhookEventDefinition<"secret-scanning-alert-resolved">;
  security_advisory:
    | WebhookEventDefinition<"security-advisory-published">
    | WebhookEventDefinition<"security-advisory-updated">
    | WebhookEventDefinition<"security-advisory-withdrawn">;
  sponsorship:
    | WebhookEventDefinition<"sponsorship-cancelled">
    | WebhookEventDefinition<"sponsorship-created">
    | WebhookEventDefinition<"sponsorship-edited">
    | WebhookEventDefinition<"sponsorship-pending-cancellation">
    | WebhookEventDefinition<"sponsorship-pending-tier-change">
    | WebhookEventDefinition<"sponsorship-tier-changed">;
  star:
    | WebhookEventDefinition<"star-created">
    | WebhookEventDefinition<"star-deleted">;
  team:
    | WebhookEventDefinition<"team-added-to-repository">
    | WebhookEventDefinition<"team-created">
    | WebhookEventDefinition<"team-deleted">
    | WebhookEventDefinition<"team-edited">
    | WebhookEventDefinition<"team-removed-from-repository">;
  watch: WebhookEventDefinition<"watch-started">;
  workflow_job:
    | WebhookEventDefinition<"workflow-job-completed">
    | WebhookEventDefinition<"workflow-job-in-progress">
    | WebhookEventDefinition<"workflow-job-queued">;
  workflow_run:
    | WebhookEventDefinition<"workflow-run-completed">
    | WebhookEventDefinition<"workflow-run-in-progress">
    | WebhookEventDefinition<"workflow-run-requested">;
};
