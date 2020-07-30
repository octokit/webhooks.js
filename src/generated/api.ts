import { IncomingMessage, ServerResponse } from "http";
import { EventNames } from "./event-names";
import { EventPayloads } from "./event-payloads";
import { WebhookEvent as WebhookEventOptions } from "../types";

type Options = {
  secret: string;
  path?: string;
  transform?: (
    event: EventPayloads.WebhookEvent<any>
  ) => EventPayloads.WebhookEvent<any> & { [key: string]: any };
};

export type GetWebhookPayloadTypeFromEvent<T> = T extends EventNames.ErrorEvent
  ? Error
  : T extends EventNames.WildcardEvent
  ? any
  : T extends EventNames.CheckRunEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadCheckRun>
  : T extends EventNames.CheckSuiteEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadCheckSuite>
  : T extends EventNames.CommitCommentEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadCommitComment>
  : T extends EventNames.ContentReferenceEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadContentReference>
  : T extends EventNames.CreateEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadCreate>
  : T extends EventNames.DeleteEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadDelete>
  : T extends EventNames.DeployKeyEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadDeployKey>
  : T extends EventNames.DeploymentEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadDeployment>
  : T extends EventNames.DeploymentStatusEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadDeploymentStatus>
  : T extends EventNames.ForkEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadFork>
  : T extends EventNames.GithubAppAuthorizationEvent
  ? EventPayloads.WebhookEvent<
      EventPayloads.WebhookPayloadGithubAppAuthorization
    >
  : T extends EventNames.GollumEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadGollum>
  : T extends EventNames.InstallationEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadInstallation>
  : T extends EventNames.InstallationRepositoriesEvent
  ? EventPayloads.WebhookEvent<
      EventPayloads.WebhookPayloadInstallationRepositories
    >
  : T extends EventNames.IssueCommentEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadIssueComment>
  : T extends EventNames.IssuesEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadIssues>
  : T extends EventNames.LabelEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadLabel>
  : T extends EventNames.MarketplacePurchaseEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadMarketplacePurchase>
  : T extends EventNames.MemberEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadMember>
  : T extends EventNames.MembershipEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadMembership>
  : T extends EventNames.MetaEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadMeta>
  : T extends EventNames.MilestoneEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadMilestone>
  : T extends EventNames.OrganizationEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadOrganization>
  : T extends EventNames.OrgBlockEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadOrgBlock>
  : T extends EventNames.PackageEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadPackage>
  : T extends EventNames.PageBuildEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadPageBuild>
  : T extends EventNames.PingEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadPing>
  : T extends EventNames.ProjectCardEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadProjectCard>
  : T extends EventNames.ProjectColumnEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadProjectColumn>
  : T extends EventNames.ProjectEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadProject>
  : T extends EventNames.PublicEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadPublic>
  : T extends EventNames.PullRequestEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadPullRequest>
  : T extends EventNames.PullRequestReviewEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadPullRequestReview>
  : T extends EventNames.PullRequestReviewCommentEvent
  ? EventPayloads.WebhookEvent<
      EventPayloads.WebhookPayloadPullRequestReviewComment
    >
  : T extends EventNames.PushEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadPush>
  : T extends EventNames.ReleaseEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadRelease>
  : T extends EventNames.RepositoryDispatchEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadRepositoryDispatch>
  : T extends EventNames.RepositoryEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadRepository>
  : T extends EventNames.RepositoryImportEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadRepositoryImport>
  : T extends EventNames.RepositoryVulnerabilityAlertEvent
  ? EventPayloads.WebhookEvent<
      EventPayloads.WebhookPayloadRepositoryVulnerabilityAlert
    >
  : T extends EventNames.SecurityAdvisoryEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadSecurityAdvisory>
  : T extends EventNames.SponsorshipEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadSponsorship>
  : T extends EventNames.StarEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadStar>
  : T extends EventNames.StatusEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadStatus>
  : T extends EventNames.TeamEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadTeam>
  : T extends EventNames.TeamAddEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadTeamAdd>
  : T extends EventNames.WatchEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadWatch>
  : T extends EventNames.WorkflowDispatchEvent
  ? EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadWorkflowDispatch>
  : never;

export declare class Webhooks {
  constructor(options?: Options);
  public on<T extends EventNames.AllEventTypes>(
    event: T | T[],
    callback: (event: GetWebhookPayloadTypeFromEvent<T>) => Promise<void> | void
  ): void;
  public sign(secret: string, payload: string | object): string;
  public verify(eventPayload?: object, signature?: string | string[]): boolean;
  public verifyAndReceive(options: WebhookEventOptions): Promise<void>;
  public receive(options: {
    id: string;
    name: string;
    payload: any;
  }): Promise<void>;
  public removeListener<T extends EventNames.AllEventTypes>(
    event: T | T[],
    callback: (event: GetWebhookPayloadTypeFromEvent<T>) => Promise<void> | void
  ): void;
  public middleware(
    request: IncomingMessage,
    response: ServerResponse,
    next?: (err?: any) => void
  ): void | Promise<void>;
}
