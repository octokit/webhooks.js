import { EventNames } from "./event-names";
import { EventPayloads } from "./event-payloads";
import { WebhookEvent, WebhookEventHandlerError } from "../types";

export type GetWebhookPayloadTypeFromEvent<
  E = EventNames.All,
  T = WebhookEvent
> = E extends EventNames.ErrorEvent
  ? WebhookEventHandlerError
  : E extends EventNames.WildcardEvent
  ? any
  : E extends EventNames.CheckRunEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadCheckRun> & T
  : E extends EventNames.CheckSuiteEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadCheckSuite> & T
  : E extends EventNames.CommitCommentEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadCommitComment> & T
  : E extends EventNames.ContentReferenceEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadContentReference> & T
  : E extends EventNames.CreateEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadCreate> & T
  : E extends EventNames.DeleteEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadDelete> & T
  : E extends EventNames.DeployKeyEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadDeployKey> & T
  : E extends EventNames.DeploymentEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadDeployment> & T
  : E extends EventNames.DeploymentStatusEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadDeploymentStatus> & T
  : E extends EventNames.ForkEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadFork> & T
  : E extends EventNames.GithubAppAuthorizationEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadGithubAppAuthorization> & T
  : E extends EventNames.GollumEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadGollum> & T
  : E extends EventNames.InstallationEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadInstallation> & T
  : E extends EventNames.InstallationRepositoriesEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadInstallationRepositories> & T
  : E extends EventNames.IssueCommentEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadIssueComment> & T
  : E extends EventNames.IssuesEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadIssues> & T
  : E extends EventNames.LabelEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadLabel> & T
  : E extends EventNames.MarketplacePurchaseEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadMarketplacePurchase> & T
  : E extends EventNames.MemberEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadMember> & T
  : E extends EventNames.MembershipEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadMembership> & T
  : E extends EventNames.MetaEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadMeta> & T
  : E extends EventNames.MilestoneEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadMilestone> & T
  : E extends EventNames.OrganizationEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadOrganization> & T
  : E extends EventNames.OrgBlockEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadOrgBlock> & T
  : E extends EventNames.PackageEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadPackage> & T
  : E extends EventNames.PageBuildEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadPageBuild> & T
  : E extends EventNames.PingEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadPing> & T
  : E extends EventNames.ProjectCardEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadProjectCard> & T
  : E extends EventNames.ProjectColumnEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadProjectColumn> & T
  : E extends EventNames.ProjectEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadProject> & T
  : E extends EventNames.PublicEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadPublic> & T
  : E extends EventNames.PullRequestEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadPullRequest> & T
  : E extends EventNames.PullRequestReviewEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadPullRequestReview> & T
  : E extends EventNames.PullRequestReviewCommentEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadPullRequestReviewComment> & T
  : E extends EventNames.PushEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadPush> & T
  : E extends EventNames.ReleaseEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadRelease> & T
  : E extends EventNames.RepositoryDispatchEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadRepositoryDispatch> & T
  : E extends EventNames.RepositoryEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadRepository> & T
  : E extends EventNames.RepositoryImportEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadRepositoryImport> & T
  : E extends EventNames.RepositoryVulnerabilityAlertEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadRepositoryVulnerabilityAlert> & T
  : E extends EventNames.SecurityAdvisoryEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadSecurityAdvisory> & T
  : E extends EventNames.SponsorshipEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadSponsorship> & T
  : E extends EventNames.StarEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadStar> & T
  : E extends EventNames.StatusEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadStatus> & T
  : E extends EventNames.TeamEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadTeam> & T
  : E extends EventNames.TeamAddEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadTeamAdd> & T
  : E extends EventNames.WatchEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadWatch> & T
  : E extends EventNames.WorkflowDispatchEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadWorkflowDispatch> & T
  : E extends EventNames.WorkflowRunEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadWorkflowRun> & T
  : never;
