import http = require("http");
import { EventNames } from "./event-names";
import { EventPayloads } from "./event-payloads";

type Options = {
  secret: string;
  path?: string;
  transform?: (
    event: EventPayloads.WebhookEvent<any>
  ) => EventPayloads.WebhookEvent<any> & { [key: string]: any };
};

export declare class Webhooks {
  constructor(options?: Options);

  public on(
    event: EventNames.ErrorEvent,
    callback: (event: Error) => void
  ): void;
  public on(
    event: "*" | string[],
    callback: (event: EventPayloads.WebhookEvent<any>) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.CheckRunEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadCheckRun>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.CheckSuiteEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadCheckSuite>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.CommitCommentEvent,
    callback: (
      event: EventPayloads.WebhookEvent<
        EventPayloads.WebhookPayloadCommitComment
      >
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.ContentReferenceEvent,
    callback: (
      event: EventPayloads.WebhookEvent<
        EventPayloads.WebhookPayloadContentReference
      >
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.CreateEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadCreate>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.DeleteEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadDelete>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.DeployKeyEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadDeployKey>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.DeploymentEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadDeployment>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.DeploymentStatusEvent,
    callback: (
      event: EventPayloads.WebhookEvent<
        EventPayloads.WebhookPayloadDeploymentStatus
      >
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.ForkEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadFork>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.GithubAppAuthorizationEvent,
    callback: (
      event: EventPayloads.WebhookEvent<
        EventPayloads.WebhookPayloadGithubAppAuthorization
      >
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.GollumEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadGollum>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.InstallationEvent,
    callback: (
      event: EventPayloads.WebhookEvent<
        EventPayloads.WebhookPayloadInstallation
      >
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.InstallationRepositoriesEvent,
    callback: (
      event: EventPayloads.WebhookEvent<
        EventPayloads.WebhookPayloadInstallationRepositories
      >
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.IssueCommentEvent,
    callback: (
      event: EventPayloads.WebhookEvent<
        EventPayloads.WebhookPayloadIssueComment
      >
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.IssuesEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadIssues>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.LabelEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadLabel>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.MarketplacePurchaseEvent,
    callback: (
      event: EventPayloads.WebhookEvent<
        EventPayloads.WebhookPayloadMarketplacePurchase
      >
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.MemberEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadMember>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.MembershipEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadMembership>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.MetaEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadMeta>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.MilestoneEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadMilestone>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.OrganizationEvent,
    callback: (
      event: EventPayloads.WebhookEvent<
        EventPayloads.WebhookPayloadOrganization
      >
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.OrgBlockEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadOrgBlock>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.PackageEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadPackage>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.PageBuildEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadPageBuild>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.ProjectCardEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadProjectCard>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.ProjectColumnEvent,
    callback: (
      event: EventPayloads.WebhookEvent<
        EventPayloads.WebhookPayloadProjectColumn
      >
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.ProjectEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadProject>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.PublicEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadPublic>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.PullRequestEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadPullRequest>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.PullRequestReviewEvent,
    callback: (
      event: EventPayloads.WebhookEvent<
        EventPayloads.WebhookPayloadPullRequestReview
      >
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.PullRequestReviewCommentEvent,
    callback: (
      event: EventPayloads.WebhookEvent<
        EventPayloads.WebhookPayloadPullRequestReviewComment
      >
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.PushEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadPush>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.ReleaseEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadRelease>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.RepositoryDispatchEvent,
    callback: (
      event: EventPayloads.WebhookEvent<
        EventPayloads.WebhookPayloadRepositoryDispatch
      >
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.RepositoryEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadRepository>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.RepositoryImportEvent,
    callback: (
      event: EventPayloads.WebhookEvent<
        EventPayloads.WebhookPayloadRepositoryImport
      >
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.RepositoryVulnerabilityAlertEvent,
    callback: (
      event: EventPayloads.WebhookEvent<
        EventPayloads.WebhookPayloadRepositoryVulnerabilityAlert
      >
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.SecurityAdvisoryEvent,
    callback: (
      event: EventPayloads.WebhookEvent<
        EventPayloads.WebhookPayloadSecurityAdvisory
      >
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.SponsorshipEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadSponsorship>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.StarEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadStar>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.StatusEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadStatus>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.TeamEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadTeam>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.TeamAddEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadTeamAdd>
    ) => Promise<void> | void
  ): void;

  public on(
    event: EventNames.WatchEvent,
    callback: (
      event: EventPayloads.WebhookEvent<EventPayloads.WebhookPayloadWatch>
    ) => Promise<void> | void
  ): void;

  public sign(data: any): string;
  public verify(eventPayload: any, signature: string): boolean;
  public verifyAndReceive(options: {
    id: string;
    name: string;
    payload: any;
    signature: string;
  }): Promise<void>;
  public receive(options: {
    id: string;
    name: string;
    payload: any;
  }): Promise<void>;
  public removeListener(
    event: string | string[],
    callback: (event: EventPayloads.WebhookEvent<any>) => void
  ): void;
  public removeListener(
    event: string | string[],
    callback: (event: EventPayloads.WebhookEvent<any>) => Promise<void>
  ): void;
  public middleware(
    request: http.IncomingMessage,
    response: http.ServerResponse,
    next?: (err?: any) => void
  ): void | Promise<void>;
}
