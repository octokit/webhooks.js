// THIS FILE IS GENERATED - DO NOT EDIT DIRECTLY
// make edits in scripts/generate-types.js

import { EventPayloads } from "./event-payloads";
import { WebhookEvent, WebhookEventHandlerError } from "../types";

export interface EventTypesPayload {
  error: WebhookEventHandlerError;
  "*": WebhookEvent<any>;
  check_run: WebhookEvent<EventPayloads.WebhookPayloadCheckRun>;
  "check_run.completed": WebhookEvent<EventPayloads.WebhookPayloadCheckRun>;
  "check_run.created": WebhookEvent<EventPayloads.WebhookPayloadCheckRun>;
  "check_run.requested_action": WebhookEvent<
    EventPayloads.WebhookPayloadCheckRun
  >;
  "check_run.rerequested": WebhookEvent<EventPayloads.WebhookPayloadCheckRun>;
  check_suite: WebhookEvent<EventPayloads.WebhookPayloadCheckSuite>;
  "check_suite.completed": WebhookEvent<EventPayloads.WebhookPayloadCheckSuite>;
  "check_suite.requested": WebhookEvent<EventPayloads.WebhookPayloadCheckSuite>;
  "check_suite.rerequested": WebhookEvent<
    EventPayloads.WebhookPayloadCheckSuite
  >;
  code_scanning_alert: WebhookEvent<
    EventPayloads.WebhookPayloadCodeScanningAlert
  >;
  "code_scanning_alert.appeared_in_branch": WebhookEvent<
    EventPayloads.WebhookPayloadCodeScanningAlert
  >;
  "code_scanning_alert.closed_by_user": WebhookEvent<
    EventPayloads.WebhookPayloadCodeScanningAlert
  >;
  "code_scanning_alert.created": WebhookEvent<
    EventPayloads.WebhookPayloadCodeScanningAlert
  >;
  "code_scanning_alert.fixed": WebhookEvent<
    EventPayloads.WebhookPayloadCodeScanningAlert
  >;
  "code_scanning_alert.reopened": WebhookEvent<
    EventPayloads.WebhookPayloadCodeScanningAlert
  >;
  "code_scanning_alert.reopened_by_user": WebhookEvent<
    EventPayloads.WebhookPayloadCodeScanningAlert
  >;
  commit_comment: WebhookEvent<EventPayloads.WebhookPayloadCommitComment>;
  "commit_comment.created": WebhookEvent<
    EventPayloads.WebhookPayloadCommitComment
  >;
  content_reference: WebhookEvent<EventPayloads.WebhookPayloadContentReference>;
  "content_reference.created": WebhookEvent<
    EventPayloads.WebhookPayloadContentReference
  >;
  create: WebhookEvent<EventPayloads.WebhookPayloadCreate>;
  delete: WebhookEvent<EventPayloads.WebhookPayloadDelete>;
  deploy_key: WebhookEvent<EventPayloads.WebhookPayloadDeployKey>;
  "deploy_key.created": WebhookEvent<EventPayloads.WebhookPayloadDeployKey>;
  "deploy_key.deleted": WebhookEvent<EventPayloads.WebhookPayloadDeployKey>;
  deployment: WebhookEvent<EventPayloads.WebhookPayloadDeployment>;
  "deployment.created": WebhookEvent<EventPayloads.WebhookPayloadDeployment>;
  deployment_status: WebhookEvent<EventPayloads.WebhookPayloadDeploymentStatus>;
  "deployment_status.created": WebhookEvent<
    EventPayloads.WebhookPayloadDeploymentStatus
  >;
  fork: WebhookEvent<EventPayloads.WebhookPayloadFork>;
  github_app_authorization: WebhookEvent<
    EventPayloads.WebhookPayloadGithubAppAuthorization
  >;
  "github_app_authorization.revoked": WebhookEvent<
    EventPayloads.WebhookPayloadGithubAppAuthorization
  >;
  gollum: WebhookEvent<EventPayloads.WebhookPayloadGollum>;
  installation: WebhookEvent<EventPayloads.WebhookPayloadInstallation>;
  "installation.created": WebhookEvent<
    EventPayloads.WebhookPayloadInstallation
  >;
  "installation.deleted": WebhookEvent<
    EventPayloads.WebhookPayloadInstallation
  >;
  "installation.new_permissions_accepted": WebhookEvent<
    EventPayloads.WebhookPayloadInstallation
  >;
  "installation.suspend": WebhookEvent<
    EventPayloads.WebhookPayloadInstallation
  >;
  "installation.unsuspend": WebhookEvent<
    EventPayloads.WebhookPayloadInstallation
  >;
  installation_repositories: WebhookEvent<
    EventPayloads.WebhookPayloadInstallationRepositories
  >;
  "installation_repositories.added": WebhookEvent<
    EventPayloads.WebhookPayloadInstallationRepositories
  >;
  "installation_repositories.removed": WebhookEvent<
    EventPayloads.WebhookPayloadInstallationRepositories
  >;
  issue_comment: WebhookEvent<EventPayloads.WebhookPayloadIssueComment>;
  "issue_comment.created": WebhookEvent<
    EventPayloads.WebhookPayloadIssueComment
  >;
  "issue_comment.deleted": WebhookEvent<
    EventPayloads.WebhookPayloadIssueComment
  >;
  "issue_comment.edited": WebhookEvent<
    EventPayloads.WebhookPayloadIssueComment
  >;
  issues: WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  "issues.assigned": WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  "issues.closed": WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  "issues.deleted": WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  "issues.demilestoned": WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  "issues.edited": WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  "issues.labeled": WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  "issues.locked": WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  "issues.milestoned": WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  "issues.opened": WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  "issues.pinned": WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  "issues.reopened": WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  "issues.transferred": WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  "issues.unassigned": WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  "issues.unlabeled": WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  "issues.unlocked": WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  "issues.unpinned": WebhookEvent<EventPayloads.WebhookPayloadIssues>;
  label: WebhookEvent<EventPayloads.WebhookPayloadLabel>;
  "label.created": WebhookEvent<EventPayloads.WebhookPayloadLabel>;
  "label.deleted": WebhookEvent<EventPayloads.WebhookPayloadLabel>;
  "label.edited": WebhookEvent<EventPayloads.WebhookPayloadLabel>;
  marketplace_purchase: WebhookEvent<
    EventPayloads.WebhookPayloadMarketplacePurchase
  >;
  "marketplace_purchase.cancelled": WebhookEvent<
    EventPayloads.WebhookPayloadMarketplacePurchase
  >;
  "marketplace_purchase.changed": WebhookEvent<
    EventPayloads.WebhookPayloadMarketplacePurchase
  >;
  "marketplace_purchase.pending_change": WebhookEvent<
    EventPayloads.WebhookPayloadMarketplacePurchase
  >;
  "marketplace_purchase.pending_change_cancelled": WebhookEvent<
    EventPayloads.WebhookPayloadMarketplacePurchase
  >;
  "marketplace_purchase.purchased": WebhookEvent<
    EventPayloads.WebhookPayloadMarketplacePurchase
  >;
  member: WebhookEvent<EventPayloads.WebhookPayloadMember>;
  "member.added": WebhookEvent<EventPayloads.WebhookPayloadMember>;
  "member.edited": WebhookEvent<EventPayloads.WebhookPayloadMember>;
  "member.removed": WebhookEvent<EventPayloads.WebhookPayloadMember>;
  membership: WebhookEvent<EventPayloads.WebhookPayloadMembership>;
  "membership.added": WebhookEvent<EventPayloads.WebhookPayloadMembership>;
  "membership.removed": WebhookEvent<EventPayloads.WebhookPayloadMembership>;
  meta: WebhookEvent<EventPayloads.WebhookPayloadMeta>;
  "meta.deleted": WebhookEvent<EventPayloads.WebhookPayloadMeta>;
  milestone: WebhookEvent<EventPayloads.WebhookPayloadMilestone>;
  "milestone.closed": WebhookEvent<EventPayloads.WebhookPayloadMilestone>;
  "milestone.created": WebhookEvent<EventPayloads.WebhookPayloadMilestone>;
  "milestone.deleted": WebhookEvent<EventPayloads.WebhookPayloadMilestone>;
  "milestone.edited": WebhookEvent<EventPayloads.WebhookPayloadMilestone>;
  "milestone.opened": WebhookEvent<EventPayloads.WebhookPayloadMilestone>;
  organization: WebhookEvent<EventPayloads.WebhookPayloadOrganization>;
  "organization.deleted": WebhookEvent<
    EventPayloads.WebhookPayloadOrganization
  >;
  "organization.member_added": WebhookEvent<
    EventPayloads.WebhookPayloadOrganization
  >;
  "organization.member_invited": WebhookEvent<
    EventPayloads.WebhookPayloadOrganization
  >;
  "organization.member_removed": WebhookEvent<
    EventPayloads.WebhookPayloadOrganization
  >;
  "organization.renamed": WebhookEvent<
    EventPayloads.WebhookPayloadOrganization
  >;
  org_block: WebhookEvent<EventPayloads.WebhookPayloadOrgBlock>;
  "org_block.blocked": WebhookEvent<EventPayloads.WebhookPayloadOrgBlock>;
  "org_block.unblocked": WebhookEvent<EventPayloads.WebhookPayloadOrgBlock>;
  package: WebhookEvent<EventPayloads.WebhookPayloadPackage>;
  "package.published": WebhookEvent<EventPayloads.WebhookPayloadPackage>;
  "package.updated": WebhookEvent<EventPayloads.WebhookPayloadPackage>;
  page_build: WebhookEvent<EventPayloads.WebhookPayloadPageBuild>;
  ping: WebhookEvent<EventPayloads.WebhookPayloadPing>;
  project_card: WebhookEvent<EventPayloads.WebhookPayloadProjectCard>;
  "project_card.converted": WebhookEvent<
    EventPayloads.WebhookPayloadProjectCard
  >;
  "project_card.created": WebhookEvent<EventPayloads.WebhookPayloadProjectCard>;
  "project_card.deleted": WebhookEvent<EventPayloads.WebhookPayloadProjectCard>;
  "project_card.edited": WebhookEvent<EventPayloads.WebhookPayloadProjectCard>;
  "project_card.moved": WebhookEvent<EventPayloads.WebhookPayloadProjectCard>;
  project_column: WebhookEvent<EventPayloads.WebhookPayloadProjectColumn>;
  "project_column.created": WebhookEvent<
    EventPayloads.WebhookPayloadProjectColumn
  >;
  "project_column.deleted": WebhookEvent<
    EventPayloads.WebhookPayloadProjectColumn
  >;
  "project_column.edited": WebhookEvent<
    EventPayloads.WebhookPayloadProjectColumn
  >;
  "project_column.moved": WebhookEvent<
    EventPayloads.WebhookPayloadProjectColumn
  >;
  project: WebhookEvent<EventPayloads.WebhookPayloadProject>;
  "project.closed": WebhookEvent<EventPayloads.WebhookPayloadProject>;
  "project.created": WebhookEvent<EventPayloads.WebhookPayloadProject>;
  "project.deleted": WebhookEvent<EventPayloads.WebhookPayloadProject>;
  "project.edited": WebhookEvent<EventPayloads.WebhookPayloadProject>;
  "project.reopened": WebhookEvent<EventPayloads.WebhookPayloadProject>;
  public: WebhookEvent<EventPayloads.WebhookPayloadPublic>;
  pull_request: WebhookEvent<EventPayloads.WebhookPayloadPullRequest>;
  "pull_request.assigned": WebhookEvent<
    EventPayloads.WebhookPayloadPullRequest
  >;
  "pull_request.closed": WebhookEvent<EventPayloads.WebhookPayloadPullRequest>;
  "pull_request.edited": WebhookEvent<EventPayloads.WebhookPayloadPullRequest>;
  "pull_request.labeled": WebhookEvent<EventPayloads.WebhookPayloadPullRequest>;
  "pull_request.locked": WebhookEvent<EventPayloads.WebhookPayloadPullRequest>;
  "pull_request.merged": WebhookEvent<EventPayloads.WebhookPayloadPullRequest>;
  "pull_request.opened": WebhookEvent<EventPayloads.WebhookPayloadPullRequest>;
  "pull_request.ready_for_review": WebhookEvent<
    EventPayloads.WebhookPayloadPullRequest
  >;
  "pull_request.reopened": WebhookEvent<
    EventPayloads.WebhookPayloadPullRequest
  >;
  "pull_request.review_request_removed": WebhookEvent<
    EventPayloads.WebhookPayloadPullRequest
  >;
  "pull_request.review_requested": WebhookEvent<
    EventPayloads.WebhookPayloadPullRequest
  >;
  "pull_request.synchronize": WebhookEvent<
    EventPayloads.WebhookPayloadPullRequest
  >;
  "pull_request.unassigned": WebhookEvent<
    EventPayloads.WebhookPayloadPullRequest
  >;
  "pull_request.unlabeled": WebhookEvent<
    EventPayloads.WebhookPayloadPullRequest
  >;
  "pull_request.unlocked": WebhookEvent<
    EventPayloads.WebhookPayloadPullRequest
  >;
  pull_request_review: WebhookEvent<
    EventPayloads.WebhookPayloadPullRequestReview
  >;
  "pull_request_review.dismissed": WebhookEvent<
    EventPayloads.WebhookPayloadPullRequestReview
  >;
  "pull_request_review.edited": WebhookEvent<
    EventPayloads.WebhookPayloadPullRequestReview
  >;
  "pull_request_review.submitted": WebhookEvent<
    EventPayloads.WebhookPayloadPullRequestReview
  >;
  pull_request_review_comment: WebhookEvent<
    EventPayloads.WebhookPayloadPullRequestReviewComment
  >;
  "pull_request_review_comment.created": WebhookEvent<
    EventPayloads.WebhookPayloadPullRequestReviewComment
  >;
  "pull_request_review_comment.deleted": WebhookEvent<
    EventPayloads.WebhookPayloadPullRequestReviewComment
  >;
  "pull_request_review_comment.edited": WebhookEvent<
    EventPayloads.WebhookPayloadPullRequestReviewComment
  >;
  push: WebhookEvent<EventPayloads.WebhookPayloadPush>;
  release: WebhookEvent<EventPayloads.WebhookPayloadRelease>;
  "release.created": WebhookEvent<EventPayloads.WebhookPayloadRelease>;
  "release.deleted": WebhookEvent<EventPayloads.WebhookPayloadRelease>;
  "release.edited": WebhookEvent<EventPayloads.WebhookPayloadRelease>;
  "release.prereleased": WebhookEvent<EventPayloads.WebhookPayloadRelease>;
  "release.published": WebhookEvent<EventPayloads.WebhookPayloadRelease>;
  "release.released": WebhookEvent<EventPayloads.WebhookPayloadRelease>;
  "release.unpublished": WebhookEvent<EventPayloads.WebhookPayloadRelease>;
  repository_dispatch: WebhookEvent<
    EventPayloads.WebhookPayloadRepositoryDispatch
  >;
  "repository_dispatch.on-demand-test": WebhookEvent<
    EventPayloads.WebhookPayloadRepositoryDispatch
  >;
  repository: WebhookEvent<EventPayloads.WebhookPayloadRepository>;
  "repository.archived": WebhookEvent<EventPayloads.WebhookPayloadRepository>;
  "repository.created": WebhookEvent<EventPayloads.WebhookPayloadRepository>;
  "repository.deleted": WebhookEvent<EventPayloads.WebhookPayloadRepository>;
  "repository.edited": WebhookEvent<EventPayloads.WebhookPayloadRepository>;
  "repository.privatized": WebhookEvent<EventPayloads.WebhookPayloadRepository>;
  "repository.publicized": WebhookEvent<EventPayloads.WebhookPayloadRepository>;
  "repository.renamed": WebhookEvent<EventPayloads.WebhookPayloadRepository>;
  "repository.transferred": WebhookEvent<
    EventPayloads.WebhookPayloadRepository
  >;
  "repository.unarchived": WebhookEvent<EventPayloads.WebhookPayloadRepository>;
  repository_import: WebhookEvent<EventPayloads.WebhookPayloadRepositoryImport>;
  repository_vulnerability_alert: WebhookEvent<
    EventPayloads.WebhookPayloadRepositoryVulnerabilityAlert
  >;
  "repository_vulnerability_alert.create": WebhookEvent<
    EventPayloads.WebhookPayloadRepositoryVulnerabilityAlert
  >;
  "repository_vulnerability_alert.dismiss": WebhookEvent<
    EventPayloads.WebhookPayloadRepositoryVulnerabilityAlert
  >;
  "repository_vulnerability_alert.resolve": WebhookEvent<
    EventPayloads.WebhookPayloadRepositoryVulnerabilityAlert
  >;
  security_advisory: WebhookEvent<EventPayloads.WebhookPayloadSecurityAdvisory>;
  "security_advisory.performed": WebhookEvent<
    EventPayloads.WebhookPayloadSecurityAdvisory
  >;
  "security_advisory.published": WebhookEvent<
    EventPayloads.WebhookPayloadSecurityAdvisory
  >;
  "security_advisory.updated": WebhookEvent<
    EventPayloads.WebhookPayloadSecurityAdvisory
  >;
  sponsorship: WebhookEvent<EventPayloads.WebhookPayloadSponsorship>;
  "sponsorship.cancelled": WebhookEvent<
    EventPayloads.WebhookPayloadSponsorship
  >;
  "sponsorship.created": WebhookEvent<EventPayloads.WebhookPayloadSponsorship>;
  "sponsorship.edited": WebhookEvent<EventPayloads.WebhookPayloadSponsorship>;
  "sponsorship.pending_cancellation": WebhookEvent<
    EventPayloads.WebhookPayloadSponsorship
  >;
  "sponsorship.pending_tier_change": WebhookEvent<
    EventPayloads.WebhookPayloadSponsorship
  >;
  "sponsorship.tier_changed": WebhookEvent<
    EventPayloads.WebhookPayloadSponsorship
  >;
  star: WebhookEvent<EventPayloads.WebhookPayloadStar>;
  "star.created": WebhookEvent<EventPayloads.WebhookPayloadStar>;
  "star.deleted": WebhookEvent<EventPayloads.WebhookPayloadStar>;
  status: WebhookEvent<EventPayloads.WebhookPayloadStatus>;
  team: WebhookEvent<EventPayloads.WebhookPayloadTeam>;
  "team.added_to_repository": WebhookEvent<EventPayloads.WebhookPayloadTeam>;
  "team.created": WebhookEvent<EventPayloads.WebhookPayloadTeam>;
  "team.deleted": WebhookEvent<EventPayloads.WebhookPayloadTeam>;
  "team.edited": WebhookEvent<EventPayloads.WebhookPayloadTeam>;
  "team.removed_from_repository": WebhookEvent<
    EventPayloads.WebhookPayloadTeam
  >;
  team_add: WebhookEvent<EventPayloads.WebhookPayloadTeamAdd>;
  watch: WebhookEvent<EventPayloads.WebhookPayloadWatch>;
  "watch.started": WebhookEvent<EventPayloads.WebhookPayloadWatch>;
  workflow_dispatch: WebhookEvent<EventPayloads.WebhookPayloadWorkflowDispatch>;
  workflow_run: WebhookEvent<EventPayloads.WebhookPayloadWorkflowRun>;
  "workflow_run.action": WebhookEvent<EventPayloads.WebhookPayloadWorkflowRun>;
  "workflow_run.completed": WebhookEvent<
    EventPayloads.WebhookPayloadWorkflowRun
  >;
  "workflow_run.requested": WebhookEvent<
    EventPayloads.WebhookPayloadWorkflowRun
  >;
}

export type All = keyof EventTypesPayload;
