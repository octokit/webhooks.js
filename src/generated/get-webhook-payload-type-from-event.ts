// THIS FILE IS GENERATED - DO NOT EDIT DIRECTLY
// make edits in scripts/generate-types.ts

import {
  CheckRunEvent,
  CheckRunCompletedEvent,
  CheckRunCreatedEvent,
  CheckRunRequestedActionEvent,
  CheckRunRerequestedEvent,
  CheckSuiteEvent,
  CheckSuiteCompletedEvent,
  CheckSuiteRequestedEvent,
  CheckSuiteRerequestedEvent,
  CodeScanningAlertEvent,
  CodeScanningAlertAppearedInBranchEvent,
  CodeScanningAlertClosedByUserEvent,
  CodeScanningAlertCreatedEvent,
  CodeScanningAlertFixedEvent,
  CodeScanningAlertReopenedEvent,
  CodeScanningAlertReopenedByUserEvent,
  CommitCommentEvent,
  CommitCommentCreatedEvent,
  ContentReferenceEvent,
  ContentReferenceCreatedEvent,
  CreateEvent,
  DeleteEvent,
  DeployKeyEvent,
  DeployKeyCreatedEvent,
  DeployKeyDeletedEvent,
  DeploymentEvent,
  DeploymentCreatedEvent,
  DeploymentStatusEvent,
  DeploymentStatusCreatedEvent,
  ForkEvent,
  GithubAppAuthorizationEvent,
  GithubAppAuthorizationRevokedEvent,
  GollumEvent,
  InstallationEvent,
  InstallationCreatedEvent,
  InstallationDeletedEvent,
  InstallationNewPermissionsAcceptedEvent,
  InstallationSuspendEvent,
  InstallationUnsuspendEvent,
  InstallationRepositoriesEvent,
  InstallationRepositoriesAddedEvent,
  InstallationRepositoriesRemovedEvent,
  IssueCommentEvent,
  IssueCommentCreatedEvent,
  IssueCommentDeletedEvent,
  IssueCommentEditedEvent,
  IssuesEvent,
  IssuesAssignedEvent,
  IssuesClosedEvent,
  IssuesDeletedEvent,
  IssuesDemilestonedEvent,
  IssuesEditedEvent,
  IssuesLabeledEvent,
  IssuesLockedEvent,
  IssuesMilestonedEvent,
  IssuesOpenedEvent,
  IssuesPinnedEvent,
  IssuesReopenedEvent,
  IssuesTransferredEvent,
  IssuesUnassignedEvent,
  IssuesUnlabeledEvent,
  IssuesUnlockedEvent,
  IssuesUnpinnedEvent,
  LabelEvent,
  LabelCreatedEvent,
  LabelDeletedEvent,
  LabelEditedEvent,
  MarketplacePurchaseEvent,
  MarketplacePurchaseCancelledEvent,
  MarketplacePurchaseChangedEvent,
  MarketplacePurchasePendingChangeEvent,
  MarketplacePurchasePendingChangeCancelledEvent,
  MarketplacePurchasePurchasedEvent,
  MemberEvent,
  MemberAddedEvent,
  MemberEditedEvent,
  MemberRemovedEvent,
  MembershipEvent,
  MembershipAddedEvent,
  MembershipRemovedEvent,
  MetaEvent,
  MetaDeletedEvent,
  MilestoneEvent,
  MilestoneClosedEvent,
  MilestoneCreatedEvent,
  MilestoneDeletedEvent,
  MilestoneEditedEvent,
  MilestoneOpenedEvent,
  OrgBlockEvent,
  OrgBlockBlockedEvent,
  OrgBlockUnblockedEvent,
  OrganizationEvent,
  OrganizationDeletedEvent,
  OrganizationMemberAddedEvent,
  OrganizationMemberInvitedEvent,
  OrganizationMemberRemovedEvent,
  OrganizationRenamedEvent,
  PackageEvent,
  PackagePublishedEvent,
  PackageUpdatedEvent,
  PageBuildEvent,
  PingEvent,
  ProjectEvent,
  ProjectClosedEvent,
  ProjectCreatedEvent,
  ProjectDeletedEvent,
  ProjectEditedEvent,
  ProjectReopenedEvent,
  ProjectCardEvent,
  ProjectCardConvertedEvent,
  ProjectCardCreatedEvent,
  ProjectCardDeletedEvent,
  ProjectCardEditedEvent,
  ProjectCardMovedEvent,
  ProjectColumnEvent,
  ProjectColumnCreatedEvent,
  ProjectColumnDeletedEvent,
  ProjectColumnEditedEvent,
  ProjectColumnMovedEvent,
  PublicEvent,
  PullRequestEvent,
  PullRequestAssignedEvent,
  PullRequestAutoMergeDisabledEvent,
  PullRequestAutoMergeEnabledEvent,
  PullRequestClosedEvent,
  PullRequestConvertedToDraftEvent,
  PullRequestEditedEvent,
  PullRequestLabeledEvent,
  PullRequestLockedEvent,
  PullRequestOpenedEvent,
  PullRequestReadyForReviewEvent,
  PullRequestReopenedEvent,
  PullRequestReviewRequestRemovedEvent,
  PullRequestReviewRequestedEvent,
  PullRequestSynchronizeEvent,
  PullRequestUnassignedEvent,
  PullRequestUnlabeledEvent,
  PullRequestUnlockedEvent,
  PullRequestReviewEvent,
  PullRequestReviewDismissedEvent,
  PullRequestReviewEditedEvent,
  PullRequestReviewSubmittedEvent,
  PullRequestReviewCommentEvent,
  PullRequestReviewCommentCreatedEvent,
  PullRequestReviewCommentDeletedEvent,
  PullRequestReviewCommentEditedEvent,
  PushEvent,
  ReleaseEvent,
  ReleaseCreatedEvent,
  ReleaseDeletedEvent,
  ReleaseEditedEvent,
  ReleasePrereleasedEvent,
  ReleasePublishedEvent,
  ReleaseReleasedEvent,
  ReleaseUnpublishedEvent,
  RepositoryEvent,
  RepositoryArchivedEvent,
  RepositoryCreatedEvent,
  RepositoryDeletedEvent,
  RepositoryEditedEvent,
  RepositoryPrivatizedEvent,
  RepositoryPublicizedEvent,
  RepositoryRenamedEvent,
  RepositoryTransferredEvent,
  RepositoryUnarchivedEvent,
  RepositoryDispatchEvent,
  RepositoryDispatchOnDemandTestEvent,
  RepositoryImportEvent,
  RepositoryVulnerabilityAlertEvent,
  RepositoryVulnerabilityAlertCreateEvent,
  RepositoryVulnerabilityAlertDismissEvent,
  RepositoryVulnerabilityAlertResolveEvent,
  SecretScanningAlertEvent,
  SecretScanningAlertCreatedEvent,
  SecretScanningAlertReopenedEvent,
  SecretScanningAlertResolvedEvent,
  SecurityAdvisoryEvent,
  SecurityAdvisoryPerformedEvent,
  SecurityAdvisoryPublishedEvent,
  SecurityAdvisoryUpdatedEvent,
  SponsorshipEvent,
  SponsorshipCancelledEvent,
  SponsorshipCreatedEvent,
  SponsorshipEditedEvent,
  SponsorshipPendingCancellationEvent,
  SponsorshipPendingTierChangeEvent,
  SponsorshipTierChangedEvent,
  StarEvent,
  StarCreatedEvent,
  StarDeletedEvent,
  StatusEvent,
  TeamEvent,
  TeamAddedToRepositoryEvent,
  TeamCreatedEvent,
  TeamDeletedEvent,
  TeamEditedEvent,
  TeamRemovedFromRepositoryEvent,
  TeamAddEvent,
  WatchEvent,
  WatchStartedEvent,
  WorkflowDispatchEvent,
  WorkflowRunEvent,
  WorkflowRunCompletedEvent,
  WorkflowRunRequestedEvent,
} from "@octokit/webhooks-definitions/schema";

export interface EmitterEventWebhookPayloadMap {
  check_run: CheckRunEvent;
  "check_run.completed": CheckRunCompletedEvent;
  "check_run.created": CheckRunCreatedEvent;
  "check_run.requested_action": CheckRunRequestedActionEvent;
  "check_run.rerequested": CheckRunRerequestedEvent;
  check_suite: CheckSuiteEvent;
  "check_suite.completed": CheckSuiteCompletedEvent;
  "check_suite.requested": CheckSuiteRequestedEvent;
  "check_suite.rerequested": CheckSuiteRerequestedEvent;
  code_scanning_alert: CodeScanningAlertEvent;
  "code_scanning_alert.appeared_in_branch": CodeScanningAlertAppearedInBranchEvent;
  "code_scanning_alert.closed_by_user": CodeScanningAlertClosedByUserEvent;
  "code_scanning_alert.created": CodeScanningAlertCreatedEvent;
  "code_scanning_alert.fixed": CodeScanningAlertFixedEvent;
  "code_scanning_alert.reopened": CodeScanningAlertReopenedEvent;
  "code_scanning_alert.reopened_by_user": CodeScanningAlertReopenedByUserEvent;
  commit_comment: CommitCommentEvent;
  "commit_comment.created": CommitCommentCreatedEvent;
  content_reference: ContentReferenceEvent;
  "content_reference.created": ContentReferenceCreatedEvent;
  create: CreateEvent;
  delete: DeleteEvent;
  deploy_key: DeployKeyEvent;
  "deploy_key.created": DeployKeyCreatedEvent;
  "deploy_key.deleted": DeployKeyDeletedEvent;
  deployment: DeploymentEvent;
  "deployment.created": DeploymentCreatedEvent;
  deployment_status: DeploymentStatusEvent;
  "deployment_status.created": DeploymentStatusCreatedEvent;
  fork: ForkEvent;
  github_app_authorization: GithubAppAuthorizationEvent;
  "github_app_authorization.revoked": GithubAppAuthorizationRevokedEvent;
  gollum: GollumEvent;
  installation: InstallationEvent;
  "installation.created": InstallationCreatedEvent;
  "installation.deleted": InstallationDeletedEvent;
  "installation.new_permissions_accepted": InstallationNewPermissionsAcceptedEvent;
  "installation.suspend": InstallationSuspendEvent;
  "installation.unsuspend": InstallationUnsuspendEvent;
  installation_repositories: InstallationRepositoriesEvent;
  "installation_repositories.added": InstallationRepositoriesAddedEvent;
  "installation_repositories.removed": InstallationRepositoriesRemovedEvent;
  issue_comment: IssueCommentEvent;
  "issue_comment.created": IssueCommentCreatedEvent;
  "issue_comment.deleted": IssueCommentDeletedEvent;
  "issue_comment.edited": IssueCommentEditedEvent;
  issues: IssuesEvent;
  "issues.assigned": IssuesAssignedEvent;
  "issues.closed": IssuesClosedEvent;
  "issues.deleted": IssuesDeletedEvent;
  "issues.demilestoned": IssuesDemilestonedEvent;
  "issues.edited": IssuesEditedEvent;
  "issues.labeled": IssuesLabeledEvent;
  "issues.locked": IssuesLockedEvent;
  "issues.milestoned": IssuesMilestonedEvent;
  "issues.opened": IssuesOpenedEvent;
  "issues.pinned": IssuesPinnedEvent;
  "issues.reopened": IssuesReopenedEvent;
  "issues.transferred": IssuesTransferredEvent;
  "issues.unassigned": IssuesUnassignedEvent;
  "issues.unlabeled": IssuesUnlabeledEvent;
  "issues.unlocked": IssuesUnlockedEvent;
  "issues.unpinned": IssuesUnpinnedEvent;
  label: LabelEvent;
  "label.created": LabelCreatedEvent;
  "label.deleted": LabelDeletedEvent;
  "label.edited": LabelEditedEvent;
  marketplace_purchase: MarketplacePurchaseEvent;
  "marketplace_purchase.cancelled": MarketplacePurchaseCancelledEvent;
  "marketplace_purchase.changed": MarketplacePurchaseChangedEvent;
  "marketplace_purchase.pending_change": MarketplacePurchasePendingChangeEvent;
  "marketplace_purchase.pending_change_cancelled": MarketplacePurchasePendingChangeCancelledEvent;
  "marketplace_purchase.purchased": MarketplacePurchasePurchasedEvent;
  member: MemberEvent;
  "member.added": MemberAddedEvent;
  "member.edited": MemberEditedEvent;
  "member.removed": MemberRemovedEvent;
  membership: MembershipEvent;
  "membership.added": MembershipAddedEvent;
  "membership.removed": MembershipRemovedEvent;
  meta: MetaEvent;
  "meta.deleted": MetaDeletedEvent;
  milestone: MilestoneEvent;
  "milestone.closed": MilestoneClosedEvent;
  "milestone.created": MilestoneCreatedEvent;
  "milestone.deleted": MilestoneDeletedEvent;
  "milestone.edited": MilestoneEditedEvent;
  "milestone.opened": MilestoneOpenedEvent;
  org_block: OrgBlockEvent;
  "org_block.blocked": OrgBlockBlockedEvent;
  "org_block.unblocked": OrgBlockUnblockedEvent;
  organization: OrganizationEvent;
  "organization.deleted": OrganizationDeletedEvent;
  "organization.member_added": OrganizationMemberAddedEvent;
  "organization.member_invited": OrganizationMemberInvitedEvent;
  "organization.member_removed": OrganizationMemberRemovedEvent;
  "organization.renamed": OrganizationRenamedEvent;
  package: PackageEvent;
  "package.published": PackagePublishedEvent;
  "package.updated": PackageUpdatedEvent;
  page_build: PageBuildEvent;
  ping: PingEvent;
  project: ProjectEvent;
  "project.closed": ProjectClosedEvent;
  "project.created": ProjectCreatedEvent;
  "project.deleted": ProjectDeletedEvent;
  "project.edited": ProjectEditedEvent;
  "project.reopened": ProjectReopenedEvent;
  project_card: ProjectCardEvent;
  "project_card.converted": ProjectCardConvertedEvent;
  "project_card.created": ProjectCardCreatedEvent;
  "project_card.deleted": ProjectCardDeletedEvent;
  "project_card.edited": ProjectCardEditedEvent;
  "project_card.moved": ProjectCardMovedEvent;
  project_column: ProjectColumnEvent;
  "project_column.created": ProjectColumnCreatedEvent;
  "project_column.deleted": ProjectColumnDeletedEvent;
  "project_column.edited": ProjectColumnEditedEvent;
  "project_column.moved": ProjectColumnMovedEvent;
  public: PublicEvent;
  pull_request: PullRequestEvent;
  "pull_request.assigned": PullRequestAssignedEvent;
  "pull_request.auto_merge_disabled": PullRequestAutoMergeDisabledEvent;
  "pull_request.auto_merge_enabled": PullRequestAutoMergeEnabledEvent;
  "pull_request.closed": PullRequestClosedEvent;
  "pull_request.converted_to_draft": PullRequestConvertedToDraftEvent;
  "pull_request.edited": PullRequestEditedEvent;
  "pull_request.labeled": PullRequestLabeledEvent;
  "pull_request.locked": PullRequestLockedEvent;
  "pull_request.opened": PullRequestOpenedEvent;
  "pull_request.ready_for_review": PullRequestReadyForReviewEvent;
  "pull_request.reopened": PullRequestReopenedEvent;
  "pull_request.review_request_removed": PullRequestReviewRequestRemovedEvent;
  "pull_request.review_requested": PullRequestReviewRequestedEvent;
  "pull_request.synchronize": PullRequestSynchronizeEvent;
  "pull_request.unassigned": PullRequestUnassignedEvent;
  "pull_request.unlabeled": PullRequestUnlabeledEvent;
  "pull_request.unlocked": PullRequestUnlockedEvent;
  pull_request_review: PullRequestReviewEvent;
  "pull_request_review.dismissed": PullRequestReviewDismissedEvent;
  "pull_request_review.edited": PullRequestReviewEditedEvent;
  "pull_request_review.submitted": PullRequestReviewSubmittedEvent;
  pull_request_review_comment: PullRequestReviewCommentEvent;
  "pull_request_review_comment.created": PullRequestReviewCommentCreatedEvent;
  "pull_request_review_comment.deleted": PullRequestReviewCommentDeletedEvent;
  "pull_request_review_comment.edited": PullRequestReviewCommentEditedEvent;
  push: PushEvent;
  release: ReleaseEvent;
  "release.created": ReleaseCreatedEvent;
  "release.deleted": ReleaseDeletedEvent;
  "release.edited": ReleaseEditedEvent;
  "release.prereleased": ReleasePrereleasedEvent;
  "release.published": ReleasePublishedEvent;
  "release.released": ReleaseReleasedEvent;
  "release.unpublished": ReleaseUnpublishedEvent;
  repository: RepositoryEvent;
  "repository.archived": RepositoryArchivedEvent;
  "repository.created": RepositoryCreatedEvent;
  "repository.deleted": RepositoryDeletedEvent;
  "repository.edited": RepositoryEditedEvent;
  "repository.privatized": RepositoryPrivatizedEvent;
  "repository.publicized": RepositoryPublicizedEvent;
  "repository.renamed": RepositoryRenamedEvent;
  "repository.transferred": RepositoryTransferredEvent;
  "repository.unarchived": RepositoryUnarchivedEvent;
  repository_dispatch: RepositoryDispatchEvent;
  "repository_dispatch.on-demand-test": RepositoryDispatchOnDemandTestEvent;
  repository_import: RepositoryImportEvent;
  repository_vulnerability_alert: RepositoryVulnerabilityAlertEvent;
  "repository_vulnerability_alert.create": RepositoryVulnerabilityAlertCreateEvent;
  "repository_vulnerability_alert.dismiss": RepositoryVulnerabilityAlertDismissEvent;
  "repository_vulnerability_alert.resolve": RepositoryVulnerabilityAlertResolveEvent;
  secret_scanning_alert: SecretScanningAlertEvent;
  "secret_scanning_alert.created": SecretScanningAlertCreatedEvent;
  "secret_scanning_alert.reopened": SecretScanningAlertReopenedEvent;
  "secret_scanning_alert.resolved": SecretScanningAlertResolvedEvent;
  security_advisory: SecurityAdvisoryEvent;
  "security_advisory.performed": SecurityAdvisoryPerformedEvent;
  "security_advisory.published": SecurityAdvisoryPublishedEvent;
  "security_advisory.updated": SecurityAdvisoryUpdatedEvent;
  sponsorship: SponsorshipEvent;
  "sponsorship.cancelled": SponsorshipCancelledEvent;
  "sponsorship.created": SponsorshipCreatedEvent;
  "sponsorship.edited": SponsorshipEditedEvent;
  "sponsorship.pending_cancellation": SponsorshipPendingCancellationEvent;
  "sponsorship.pending_tier_change": SponsorshipPendingTierChangeEvent;
  "sponsorship.tier_changed": SponsorshipTierChangedEvent;
  star: StarEvent;
  "star.created": StarCreatedEvent;
  "star.deleted": StarDeletedEvent;
  status: StatusEvent;
  team: TeamEvent;
  "team.added_to_repository": TeamAddedToRepositoryEvent;
  "team.created": TeamCreatedEvent;
  "team.deleted": TeamDeletedEvent;
  "team.edited": TeamEditedEvent;
  "team.removed_from_repository": TeamRemovedFromRepositoryEvent;
  team_add: TeamAddEvent;
  watch: WatchEvent;
  "watch.started": WatchStartedEvent;
  workflow_dispatch: WorkflowDispatchEvent;
  workflow_run: WorkflowRunEvent;
  "workflow_run.completed": WorkflowRunCompletedEvent;
  "workflow_run.requested": WorkflowRunRequestedEvent;
}
