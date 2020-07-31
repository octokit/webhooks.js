import { EventNames } from "./event-names";
import { EventPayloads } from "./event-payloads";
import { WebhookEvent } from "../types";

export type GetWebhookPayloadTypeFromEvent<T> = T extends EventNames.ErrorEvent
  ? Error
  : T extends EventNames.WildcardEvent
  ? any
  : T extends EventNames.CheckRunEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadCheckRun>
  : T extends EventNames.CheckSuiteEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadCheckSuite>
  : T extends EventNames.CommitCommentEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadCommitComment>
  : T extends EventNames.ContentReferenceEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadContentReference>
  : T extends EventNames.CreateEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadCreate>
  : T extends EventNames.DeleteEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadDelete>
  : T extends EventNames.DeployKeyEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadDeployKey>
  : T extends EventNames.DeploymentEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadDeployment>
  : T extends EventNames.DeploymentStatusEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadDeploymentStatus>
  : T extends EventNames.ForkEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadFork>
  : T extends EventNames.GithubAppAuthorizationEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadGithubAppAuthorization>
  : T extends EventNames.GollumEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadGollum>
  : T extends EventNames.InstallationEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadInstallation>
  : T extends EventNames.InstallationRepositoriesEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadInstallationRepositories>
  : T extends EventNames.IssueCommentEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadIssueComment>
  : T extends EventNames.IssuesEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadIssues>
  : T extends EventNames.LabelEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadLabel>
  : T extends EventNames.MarketplacePurchaseEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadMarketplacePurchase>
  : T extends EventNames.MemberEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadMember>
  : T extends EventNames.MembershipEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadMembership>
  : T extends EventNames.MetaEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadMeta>
  : T extends EventNames.MilestoneEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadMilestone>
  : T extends EventNames.OrganizationEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadOrganization>
  : T extends EventNames.OrgBlockEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadOrgBlock>
  : T extends EventNames.PackageEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadPackage>
  : T extends EventNames.PageBuildEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadPageBuild>
  : T extends EventNames.PingEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadPing>
  : T extends EventNames.ProjectCardEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadProjectCard>
  : T extends EventNames.ProjectColumnEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadProjectColumn>
  : T extends EventNames.ProjectEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadProject>
  : T extends EventNames.PublicEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadPublic>
  : T extends EventNames.PullRequestEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadPullRequest>
  : T extends EventNames.PullRequestReviewEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadPullRequestReview>
  : T extends EventNames.PullRequestReviewCommentEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadPullRequestReviewComment>
  : T extends EventNames.PushEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadPush>
  : T extends EventNames.ReleaseEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadRelease>
  : T extends EventNames.RepositoryDispatchEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadRepositoryDispatch>
  : T extends EventNames.RepositoryEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadRepository>
  : T extends EventNames.RepositoryImportEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadRepositoryImport>
  : T extends EventNames.RepositoryVulnerabilityAlertEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadRepositoryVulnerabilityAlert>
  : T extends EventNames.SecurityAdvisoryEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadSecurityAdvisory>
  : T extends EventNames.SponsorshipEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadSponsorship>
  : T extends EventNames.StarEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadStar>
  : T extends EventNames.StatusEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadStatus>
  : T extends EventNames.TeamEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadTeam>
  : T extends EventNames.TeamAddEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadTeamAdd>
  : T extends EventNames.WatchEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadWatch>
  : T extends EventNames.WorkflowDispatchEvent
  ? WebhookEvent<EventPayloads.WebhookPayloadWorkflowDispatch>
  : never;
