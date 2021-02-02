// THIS FILE IS GENERATED - DO NOT EDIT DIRECTLY
// this file is deprecated - new types come from @octokit/webhooks-definitions/schema

export /** @deprecated */ declare module EventPayloads {
  /** @deprecated */
  type WebhookPayloadWorkflowRunWorkflowRunRepositoryOwner = {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
  };
  /** @deprecated */
  type WebhookPayloadWorkflowRunWorkflowRunRepository = {
    archive_url: string;
    assignees_url: string;
    blobs_url: string;
    branches_url: string;
    collaborators_url: string;
    comments_url: string;
    commits_url: string;
    compare_url: string;
    contents_url: string;
    contributors_url: string;
    deployments_url: string;
    description: string;
    downloads_url: string;
    events_url: string;
    fork: boolean;
    forks_url: string;
    full_name: string;
    git_commits_url: string;
    git_refs_url: string;
    git_tags_url: string;
    hooks_url: string;
    html_url: string;
    id: number;
    issue_comment_url: string;
    issue_events_url: string;
    issues_url: string;
    keys_url: string;
    labels_url: string;
    languages_url: string;
    merges_url: string;
    milestones_url: string;
    name: string;
    node_id: string;
    notifications_url: string;
    owner: WebhookPayloadWorkflowRunWorkflowRunRepositoryOwner;
    private: boolean;
    pulls_url: string;
    releases_url: string;
    stargazers_url: string;
    statuses_url: string;
    subscribers_url: string;
    subscription_url: string;
    tags_url: string;
    teams_url: string;
    trees_url: string;
    url: string;
  };
  /** @deprecated */
  type WebhookPayloadWorkflowRunWorkflowRunHeadRepositoryOwner = {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
  };
  /** @deprecated */
  type WebhookPayloadWorkflowRunWorkflowRunHeadRepository = {
    archive_url: string;
    assignees_url: string;
    blobs_url: string;
    branches_url: string;
    collaborators_url: string;
    comments_url: string;
    commits_url: string;
    compare_url: string;
    contents_url: string;
    contributors_url: string;
    deployments_url: string;
    description: string;
    downloads_url: string;
    events_url: string;
    fork: boolean;
    forks_url: string;
    full_name: string;
    git_commits_url: string;
    git_refs_url: string;
    git_tags_url: string;
    hooks_url: string;
    html_url: string;
    id: number;
    issue_comment_url: string;
    issue_events_url: string;
    issues_url: string;
    keys_url: string;
    labels_url: string;
    languages_url: string;
    merges_url: string;
    milestones_url: string;
    name: string;
    node_id: string;
    notifications_url: string;
    owner: WebhookPayloadWorkflowRunWorkflowRunHeadRepositoryOwner;
    private: boolean;
    pulls_url: string;
    releases_url: string;
    stargazers_url: string;
    statuses_url: string;
    subscribers_url: string;
    subscription_url: string;
    tags_url: string;
    teams_url: string;
    trees_url: string;
    url: string;
  };
  /** @deprecated */
  type WebhookPayloadWorkflowRunWorkflowRunHeadCommitCommitter = {
    email: string;
    name: string;
  };
  /** @deprecated */
  type WebhookPayloadWorkflowRunWorkflowRunHeadCommitAuthor = {
    email: string;
    name: string;
  };
  /** @deprecated */
  type WebhookPayloadWorkflowRunWorkflowRunHeadCommit = {
    author: WebhookPayloadWorkflowRunWorkflowRunHeadCommitAuthor;
    committer: WebhookPayloadWorkflowRunWorkflowRunHeadCommitCommitter;
    id: string;
    message: string;
    timestamp: string;
    tree_id: string;
  };
  /** @deprecated */
  type WebhookPayloadWorkflowRunWorkflowRun = {
    artifacts_url: string;
    cancel_url: string;
    check_suite_url: string;
    conclusion: string | null;
    created_at: string;
    event: string;
    head_branch: string;
    head_commit: WebhookPayloadWorkflowRunWorkflowRunHeadCommit;
    head_repository: WebhookPayloadWorkflowRunWorkflowRunHeadRepository;
    head_sha: string;
    html_url: string;
    id: number;
    jobs_url: string;
    logs_url: string;
    node_id: string;
    pull_requests: Array<any>;
    repository: WebhookPayloadWorkflowRunWorkflowRunRepository;
    rerun_url: string;
    run_number: number;
    status: string;
    updated_at: string;
    url: string;
    workflow_id: number;
    workflow_url: string;
  };
  /** @deprecated */
  type WebhookPayloadWorkflowRunWorkflow = {
    badge_url: string;
    created_at: string;
    html_url: string;
    id: number;
    name: string;
    node_id: string;
    path: string;
    state: string;
    updated_at: string;
    url: string;
  };
  /** @deprecated */
  type WebhookPayloadWorkflowRunOrganization = {
    avatar_url: string;
    description: string;
    events_url: string;
    hooks_url: string;
    id: number;
    issues_url: string;
    login: string;
    members_url: string;
    node_id: string;
    public_members_url: string;
    repos_url: string;
    url: string;
  };
  /** @deprecated */
  type WebhookPayloadWorkflowRun = {
    action: "action" | "completed" | "requested";
    organization: WebhookPayloadWorkflowRunOrganization;
    repository: PayloadRepository;
    sender: PayloadSender;
    workflow?: WebhookPayloadWorkflowRunWorkflow;
    workflow_run?: WebhookPayloadWorkflowRunWorkflowRun;
  };
  /** @deprecated */
  type WebhookPayloadWorkflowDispatchOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
  };
  /** @deprecated */
  type WebhookPayloadWorkflowDispatchInputs = {};
  /** @deprecated */
  type WebhookPayloadWorkflowDispatch = {
    inputs: WebhookPayloadWorkflowDispatchInputs;
    ref: string;
    repository: PayloadRepository;
    organization: WebhookPayloadWorkflowDispatchOrganization;
    sender: PayloadSender;
    workflow: string;
  };
  /** @deprecated */
  type WebhookPayloadWatchInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadWatch = {
    action: "started";
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadWatchInstallation;
  };
  /** @deprecated */
  type WebhookPayloadTeamAddInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadTeamAddOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
  };
  /** @deprecated */
  type WebhookPayloadTeamAddTeam = {
    name: string;
    id: number;
    node_id: string;
    slug: string;
    description: string;
    privacy: string;
    url: string;
    html_url: string;
    members_url: string;
    repositories_url: string;
    permission: string;
  };
  /** @deprecated */
  type WebhookPayloadTeamAdd = {
    team: WebhookPayloadTeamAddTeam;
    repository: PayloadRepository;
    organization: WebhookPayloadTeamAddOrganization;
    sender: PayloadSender;
    installation?: WebhookPayloadTeamAddInstallation;
  };
  /** @deprecated */
  type WebhookPayloadTeamChanges = {};
  /** @deprecated */
  type WebhookPayloadTeamOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
  };
  /** @deprecated */
  type PayloadRepositoryPermissions = {
    pull: boolean;
    push: boolean;
    admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadTeamTeam = {
    name: string;
    id: number;
    node_id: string;
    slug: string;
    description: string | null;
    privacy: string;
    url: string;
    html_url: string;
    members_url: string;
    repositories_url: string;
    permission: string;
  };
  /** @deprecated */
  type WebhookPayloadTeam = {
    action:
      | "added_to_repository"
      | "created"
      | "deleted"
      | "edited"
      | "removed_from_repository";
    team: WebhookPayloadTeamTeam;
    repository?: PayloadRepository;
    organization: WebhookPayloadTeamOrganization;
    sender: PayloadSender;
    changes?: WebhookPayloadTeamChanges;
  };
  /** @deprecated */
  type WebhookPayloadStatusInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadStatusBranchesItemCommit = { sha: string; url: string };
  /** @deprecated */
  type WebhookPayloadStatusBranchesItem = {
    name: string;
    commit: WebhookPayloadStatusBranchesItemCommit;
    protected: boolean;
  };
  /** @deprecated */
  type WebhookPayloadStatusCommitCommitter = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadStatusCommitAuthor = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadStatusCommitCommitVerification = {
    verified: boolean;
    reason: string;
    signature: string;
    payload: string;
  };
  /** @deprecated */
  type WebhookPayloadStatusCommitCommitTree = { sha: string; url: string };
  /** @deprecated */
  type WebhookPayloadStatusCommitCommitCommitter = {
    name: string;
    email: string;
    date: string;
  };
  /** @deprecated */
  type WebhookPayloadStatusCommitCommitAuthor = {
    name: string;
    email: string;
    date: string;
  };
  /** @deprecated */
  type WebhookPayloadStatusCommitCommit = {
    author: WebhookPayloadStatusCommitCommitAuthor;
    committer: WebhookPayloadStatusCommitCommitCommitter;
    message: string;
    tree: WebhookPayloadStatusCommitCommitTree;
    url: string;
    comment_count: number;
    verification: WebhookPayloadStatusCommitCommitVerification;
  };
  /** @deprecated */
  type WebhookPayloadStatusCommit = {
    sha: string;
    node_id: string;
    commit: WebhookPayloadStatusCommitCommit;
    url: string;
    html_url: string;
    comments_url: string;
    author: WebhookPayloadStatusCommitAuthor;
    committer: WebhookPayloadStatusCommitCommitter;
    parents: Array<any>;
  };
  /** @deprecated */
  type WebhookPayloadStatus = {
    id: number;
    sha: string;
    name: string;
    target_url: null;
    context: string;
    description: null;
    state: string;
    commit: WebhookPayloadStatusCommit;
    branches: Array<WebhookPayloadStatusBranchesItem>;
    created_at: string;
    updated_at: string;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadStatusInstallation;
  };
  /** @deprecated */
  type WebhookPayloadStar = {
    action: "created" | "deleted";
    starred_at: string | null;
    repository: PayloadRepository;
    sender: PayloadSender;
  };
  /** @deprecated */
  type WebhookPayloadSponsorshipChangesTierFrom = {
    node_id: string;
    created_at: string;
    description: string;
    monthly_price_in_cents: number;
    monthly_price_in_dollars: number;
    name: string;
  };
  /** @deprecated */
  type WebhookPayloadSponsorshipChangesTier = {
    from: WebhookPayloadSponsorshipChangesTierFrom;
  };
  /** @deprecated */
  type WebhookPayloadSponsorshipChanges = {
    tier: WebhookPayloadSponsorshipChangesTier;
  };
  /** @deprecated */
  type WebhookPayloadSponsorshipSponsorshipTier = {
    node_id: string;
    created_at: string;
    description: string;
    monthly_price_in_cents: number;
    monthly_price_in_dollars: number;
    name: string;
  };
  /** @deprecated */
  type WebhookPayloadSponsorshipSponsorshipSponsor = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadSponsorshipSponsorshipSponsorable = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadSponsorshipSponsorship = {
    node_id: string;
    created_at: string;
    sponsorable: WebhookPayloadSponsorshipSponsorshipSponsorable;
    sponsor: WebhookPayloadSponsorshipSponsorshipSponsor;
    privacy_level: string;
    tier: WebhookPayloadSponsorshipSponsorshipTier;
  };
  /** @deprecated */
  type WebhookPayloadSponsorship = {
    action:
      | "cancelled"
      | "created"
      | "edited"
      | "pending_cancellation"
      | "pending_tier_change"
      | "tier_changed";
    sponsorship: WebhookPayloadSponsorshipSponsorship;
    sender: PayloadSender;
    changes?: WebhookPayloadSponsorshipChanges;
    effective_date?: string;
  };
  /** @deprecated */
  type WebhookPayloadSecurityAdvisorySecurityAdvisoryVulnerabilitiesItemFirstPatchedVersion = {
    identifier: string;
  };
  /** @deprecated */
  type WebhookPayloadSecurityAdvisorySecurityAdvisoryVulnerabilitiesItemPackage = {
    ecosystem: string;
    name: string;
  };
  /** @deprecated */
  type WebhookPayloadSecurityAdvisorySecurityAdvisoryVulnerabilitiesItem = {
    package: WebhookPayloadSecurityAdvisorySecurityAdvisoryVulnerabilitiesItemPackage;
    severity: string;
    vulnerable_version_range: string;
    first_patched_version: WebhookPayloadSecurityAdvisorySecurityAdvisoryVulnerabilitiesItemFirstPatchedVersion;
  };
  /** @deprecated */
  type WebhookPayloadSecurityAdvisorySecurityAdvisoryReferencesItem = {
    url: string;
  };
  /** @deprecated */
  type WebhookPayloadSecurityAdvisorySecurityAdvisoryIdentifiersItem = {
    value: string;
    type: string;
  };
  /** @deprecated */
  type WebhookPayloadSecurityAdvisorySecurityAdvisory = {
    ghsa_id: string;
    summary: string;
    description: string;
    severity: string;
    identifiers: Array<WebhookPayloadSecurityAdvisorySecurityAdvisoryIdentifiersItem>;
    references: Array<WebhookPayloadSecurityAdvisorySecurityAdvisoryReferencesItem>;
    published_at: string;
    updated_at: string;
    withdrawn_at: null;
    vulnerabilities: Array<WebhookPayloadSecurityAdvisorySecurityAdvisoryVulnerabilitiesItem>;
  };
  /** @deprecated */
  type WebhookPayloadSecurityAdvisory = {
    action: "performed" | "published" | "updated";
    security_advisory: WebhookPayloadSecurityAdvisorySecurityAdvisory;
  };
  /** @deprecated */
  type WebhookPayloadSecretScanningAlertOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
  };
  /** @deprecated */
  type WebhookPayloadSecretScanningAlertAlert = {
    number: number;
    secret_type: string;
    resolution: null;
    resolved_by: null;
    resolved_at: null;
  };
  /** @deprecated */
  type WebhookPayloadSecretScanningAlert = {
    action: "created" | "reopened" | "resolved";
    alert: WebhookPayloadSecretScanningAlertAlert;
    repository: PayloadRepository;
    organization: WebhookPayloadSecretScanningAlertOrganization;
    sender: PayloadSender;
  };
  /** @deprecated */
  type WebhookPayloadRepositoryVulnerabilityAlertAlertDismisser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadRepositoryVulnerabilityAlertOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
  };
  /** @deprecated */
  type WebhookPayloadRepositoryVulnerabilityAlertAlert = {
    id: number;
    affected_range: string;
    affected_package_name: string;
    external_reference: string;
    external_identifier: string;
    fixed_in: string;
    ghsa_id?: string;
    created_at?: string;
    dismisser?: WebhookPayloadRepositoryVulnerabilityAlertAlertDismisser;
    dismiss_reason?: string;
    dismissed_at?: string;
  };
  /** @deprecated */
  type WebhookPayloadRepositoryVulnerabilityAlert = {
    action: "create" | "dismiss" | "resolve";
    alert: WebhookPayloadRepositoryVulnerabilityAlertAlert;
    repository?: PayloadRepository;
    sender?: PayloadSender;
    organization?: WebhookPayloadRepositoryVulnerabilityAlertOrganization;
  };
  /** @deprecated */
  type WebhookPayloadRepositoryImportOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
  };
  /** @deprecated */
  type WebhookPayloadRepositoryImport = {
    status: string;
    repository: PayloadRepository;
    organization: WebhookPayloadRepositoryImportOrganization;
    sender: PayloadSender;
  };
  /** @deprecated */
  type WebhookPayloadRepositoryInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadRepositoryOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
  };
  /** @deprecated */
  type WebhookPayloadRepository = {
    action:
      | "archived"
      | "created"
      | "deleted"
      | "edited"
      | "privatized"
      | "publicized"
      | "renamed"
      | "transferred"
      | "unarchived";
    repository: PayloadRepository;
    sender: PayloadSender;
    organization?: WebhookPayloadRepositoryOrganization;
    installation?: WebhookPayloadRepositoryInstallation;
  };
  /** @deprecated */
  type WebhookPayloadRepositoryDispatchInstallation = {
    id: number;
    node_id: string;
  };
  /** @deprecated */
  type WebhookPayloadRepositoryDispatchOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
  };
  /** @deprecated */
  type WebhookPayloadRepositoryDispatchClientPayload = {};
  /** @deprecated */
  type WebhookPayloadRepositoryDispatch = {
    action: "on-demand-test";
    branch: string;
    client_payload: WebhookPayloadRepositoryDispatchClientPayload;
    repository: PayloadRepository;
    organization: WebhookPayloadRepositoryDispatchOrganization;
    sender: PayloadSender;
    installation: WebhookPayloadRepositoryDispatchInstallation;
  };
  /** @deprecated */
  type WebhookPayloadReleaseInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadReleaseReleaseAuthor = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadReleaseRelease = {
    url: string;
    assets_url: string;
    upload_url: string;
    html_url: string;
    id: number;
    node_id: string;
    tag_name: string;
    target_commitish: string;
    name: null;
    draft: boolean;
    author: WebhookPayloadReleaseReleaseAuthor;
    prerelease: boolean;
    created_at: string;
    published_at: string;
    assets: Array<any>;
    tarball_url: string;
    zipball_url: string;
    body: null;
  };
  /** @deprecated */
  type WebhookPayloadRelease = {
    action:
      | "created"
      | "deleted"
      | "edited"
      | "prereleased"
      | "published"
      | "released"
      | "unpublished";
    release: WebhookPayloadReleaseRelease;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadReleaseInstallation;
  };
  /** @deprecated */
  type WebhookPayloadPushOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
    name: string;
    company: null;
    blog: null;
    location: null;
    email: null;
    twitter_username: null;
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
    updated_at: string;
    type: string;
  };
  /** @deprecated */
  type WebhookPayloadPushInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadPushPusher = { name: string; email: string };
  /** @deprecated */
  type WebhookPayloadPush = {
    ref: string;
    before: string;
    after: string;
    created: boolean;
    deleted: boolean;
    forced: boolean;
    base_ref: null;
    compare: string;
    commits: Array<any>;
    head_commit: null;
    repository: PayloadRepository;
    pusher: WebhookPayloadPushPusher;
    sender: PayloadSender;
    installation?: WebhookPayloadPushInstallation;
    organization?: WebhookPayloadPushOrganization;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
    name: string;
    company: null;
    blog: null;
    location: null;
    email: null;
    twitter_username: null;
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
    updated_at: string;
    type: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentInstallation = {
    id: number;
    node_id: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestLabelsItem = {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestRequestedReviewersItem = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestAssigneesItem = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestLinksStatuses = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestLinksCommits = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestLinksReviewComment = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestLinksReviewComments = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestLinksComments = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestLinksIssue = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestLinksHtml = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestLinksSelf = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestLinks = {
    self: WebhookPayloadPullRequestReviewCommentPullRequestLinksSelf;
    html: WebhookPayloadPullRequestReviewCommentPullRequestLinksHtml;
    issue: WebhookPayloadPullRequestReviewCommentPullRequestLinksIssue;
    comments: WebhookPayloadPullRequestReviewCommentPullRequestLinksComments;
    review_comments: WebhookPayloadPullRequestReviewCommentPullRequestLinksReviewComments;
    review_comment: WebhookPayloadPullRequestReviewCommentPullRequestLinksReviewComment;
    commits: WebhookPayloadPullRequestReviewCommentPullRequestLinksCommits;
    statuses: WebhookPayloadPullRequestReviewCommentPullRequestLinksStatuses;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestBaseRepoOwner = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestBaseRepo = {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: WebhookPayloadPullRequestReviewCommentPullRequestBaseRepoOwner;
    html_url: string;
    description: null;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url: null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: null;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    allow_squash_merge?: boolean;
    allow_merge_commit?: boolean;
    allow_rebase_merge?: boolean;
    delete_branch_on_merge?: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestBaseUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestBase = {
    label: string;
    ref: string;
    sha: string;
    user: WebhookPayloadPullRequestReviewCommentPullRequestBaseUser;
    repo: WebhookPayloadPullRequestReviewCommentPullRequestBaseRepo;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestHeadRepoOwner = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestHeadRepo = {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: WebhookPayloadPullRequestReviewCommentPullRequestHeadRepoOwner;
    html_url: string;
    description: null;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url: null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: null;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    allow_squash_merge?: boolean;
    allow_merge_commit?: boolean;
    allow_rebase_merge?: boolean;
    delete_branch_on_merge?: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestHeadUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestHead = {
    label: string;
    ref: string;
    sha: string;
    user: WebhookPayloadPullRequestReviewCommentPullRequestHeadUser;
    repo: WebhookPayloadPullRequestReviewCommentPullRequestHeadRepo;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequestUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentPullRequest = {
    url: string;
    id: number;
    node_id: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    number: number;
    state: string;
    locked: boolean;
    title: string;
    user: WebhookPayloadPullRequestReviewCommentPullRequestUser;
    body: string;
    created_at: string;
    updated_at: string;
    closed_at: null;
    merged_at: null;
    merge_commit_sha: string;
    assignee: null;
    assignees: Array<WebhookPayloadPullRequestReviewCommentPullRequestAssigneesItem>;
    requested_reviewers: Array<WebhookPayloadPullRequestReviewCommentPullRequestRequestedReviewersItem>;
    requested_teams: Array<any>;
    labels: Array<WebhookPayloadPullRequestReviewCommentPullRequestLabelsItem>;
    milestone: null;
    commits_url: string;
    review_comments_url: string;
    review_comment_url: string;
    comments_url: string;
    statuses_url: string;
    head: WebhookPayloadPullRequestReviewCommentPullRequestHead;
    base: WebhookPayloadPullRequestReviewCommentPullRequestBase;
    _links: WebhookPayloadPullRequestReviewCommentPullRequestLinks;
    author_association: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentCommentLinksPullRequest = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentCommentLinksHtml = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentCommentLinksSelf = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentCommentLinks = {
    self: WebhookPayloadPullRequestReviewCommentCommentLinksSelf;
    html: WebhookPayloadPullRequestReviewCommentCommentLinksHtml;
    pull_request: WebhookPayloadPullRequestReviewCommentCommentLinksPullRequest;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentCommentUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewCommentComment = {
    url: string;
    pull_request_review_id: number;
    id: number;
    node_id: string;
    diff_hunk: string;
    path: string;
    position: number;
    original_position: number;
    commit_id: string;
    original_commit_id: string;
    user: WebhookPayloadPullRequestReviewCommentCommentUser;
    body: string;
    created_at: string;
    updated_at: string;
    html_url: string;
    pull_request_url: string;
    author_association: string;
    _links: WebhookPayloadPullRequestReviewCommentCommentLinks;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewComment = {
    action: "created" | "deleted" | "edited";
    comment: WebhookPayloadPullRequestReviewCommentComment;
    pull_request: WebhookPayloadPullRequestReviewCommentPullRequest;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadPullRequestReviewCommentInstallation;
    organization?: WebhookPayloadPullRequestReviewCommentOrganization;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
    name: string;
    company: null;
    blog: null;
    location: null;
    email: null;
    twitter_username: null;
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
    updated_at: string;
    type: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewInstallation = {
    id: number;
    node_id: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestLabelsItem = {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestRequestedReviewersItem = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestAssigneesItem = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestLinksStatuses = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestLinksCommits = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestLinksReviewComment = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestLinksReviewComments = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestLinksComments = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestLinksIssue = { href: string };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestLinksHtml = { href: string };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestLinksSelf = { href: string };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestLinks = {
    self: WebhookPayloadPullRequestReviewPullRequestLinksSelf;
    html: WebhookPayloadPullRequestReviewPullRequestLinksHtml;
    issue: WebhookPayloadPullRequestReviewPullRequestLinksIssue;
    comments: WebhookPayloadPullRequestReviewPullRequestLinksComments;
    review_comments: WebhookPayloadPullRequestReviewPullRequestLinksReviewComments;
    review_comment: WebhookPayloadPullRequestReviewPullRequestLinksReviewComment;
    commits: WebhookPayloadPullRequestReviewPullRequestLinksCommits;
    statuses: WebhookPayloadPullRequestReviewPullRequestLinksStatuses;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestBaseRepoOwner = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestBaseRepo = {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: WebhookPayloadPullRequestReviewPullRequestBaseRepoOwner;
    html_url: string;
    description: null;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url: null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: null;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    allow_squash_merge?: boolean;
    allow_merge_commit?: boolean;
    allow_rebase_merge?: boolean;
    delete_branch_on_merge?: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestBaseUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestBase = {
    label: string;
    ref: string;
    sha: string;
    user: WebhookPayloadPullRequestReviewPullRequestBaseUser;
    repo: WebhookPayloadPullRequestReviewPullRequestBaseRepo;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestHeadRepoOwner = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestHeadRepo = {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: WebhookPayloadPullRequestReviewPullRequestHeadRepoOwner;
    html_url: string;
    description: null;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url: null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: null;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    allow_squash_merge?: boolean;
    allow_merge_commit?: boolean;
    allow_rebase_merge?: boolean;
    delete_branch_on_merge?: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestHeadUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestHead = {
    label: string;
    ref: string;
    sha: string;
    user: WebhookPayloadPullRequestReviewPullRequestHeadUser;
    repo: WebhookPayloadPullRequestReviewPullRequestHeadRepo;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequestUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewPullRequest = {
    url: string;
    id: number;
    node_id: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    number: number;
    state: string;
    locked: boolean;
    title: string;
    user: WebhookPayloadPullRequestReviewPullRequestUser;
    body: string;
    created_at: string;
    updated_at: string;
    closed_at: null;
    merged_at: null;
    merge_commit_sha: string;
    assignee: null;
    assignees: Array<WebhookPayloadPullRequestReviewPullRequestAssigneesItem>;
    requested_reviewers: Array<WebhookPayloadPullRequestReviewPullRequestRequestedReviewersItem>;
    requested_teams: Array<any>;
    labels: Array<WebhookPayloadPullRequestReviewPullRequestLabelsItem>;
    milestone: null;
    commits_url: string;
    review_comments_url: string;
    review_comment_url: string;
    comments_url: string;
    statuses_url: string;
    head: WebhookPayloadPullRequestReviewPullRequestHead;
    base: WebhookPayloadPullRequestReviewPullRequestBase;
    _links: WebhookPayloadPullRequestReviewPullRequestLinks;
    author_association: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewReviewLinksPullRequest = { href: string };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewReviewLinksHtml = { href: string };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewReviewLinks = {
    html: WebhookPayloadPullRequestReviewReviewLinksHtml;
    pull_request: WebhookPayloadPullRequestReviewReviewLinksPullRequest;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewReviewUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReviewReview = {
    id: number;
    node_id: string;
    user: WebhookPayloadPullRequestReviewReviewUser;
    body: null;
    commit_id: string;
    submitted_at: string;
    state: string;
    html_url: string;
    pull_request_url: string;
    author_association: string;
    _links: WebhookPayloadPullRequestReviewReviewLinks;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestReview = {
    action: "dismissed" | "edited" | "submitted";
    review: WebhookPayloadPullRequestReviewReview;
    pull_request: WebhookPayloadPullRequestReviewPullRequest;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadPullRequestReviewInstallation;
    organization?: WebhookPayloadPullRequestReviewOrganization;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestLabel = {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestMilestoneCreator = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  type WebhookPayloadPullRequestPullRequestMilestone = null | {
    url: string;
    html_url: string;
    labels_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    description: string;
    creator: WebhookPayloadPullRequestPullRequestMilestoneCreator;
    open_issues: number;
    closed_issues: number;
    state: string;
    created_at: string;
    updated_at: string;
    due_on: string;
    closed_at: string;
  };
  type WebhookPayloadPullRequestPullRequestAssignee = null | {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
    name: string;
    company: null;
    blog: null;
    location: null;
    email: null;
    twitter_username: null;
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
    updated_at: string;
    type: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadPullRequestAssignee = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestLabelsItem = {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestRequestedReviewersItem = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestAssigneesItem = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestLinksStatuses = { href: string };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestLinksCommits = { href: string };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestLinksReviewComment = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestLinksReviewComments = {
    href: string;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestLinksComments = { href: string };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestLinksIssue = { href: string };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestLinksHtml = { href: string };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestLinksSelf = { href: string };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestLinks = {
    self: WebhookPayloadPullRequestPullRequestLinksSelf;
    html: WebhookPayloadPullRequestPullRequestLinksHtml;
    issue: WebhookPayloadPullRequestPullRequestLinksIssue;
    comments: WebhookPayloadPullRequestPullRequestLinksComments;
    review_comments: WebhookPayloadPullRequestPullRequestLinksReviewComments;
    review_comment: WebhookPayloadPullRequestPullRequestLinksReviewComment;
    commits: WebhookPayloadPullRequestPullRequestLinksCommits;
    statuses: WebhookPayloadPullRequestPullRequestLinksStatuses;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestBaseRepoOwner = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestBaseRepo = {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: WebhookPayloadPullRequestPullRequestBaseRepoOwner;
    html_url: string;
    description: null;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: null | string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url: null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: null;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    allow_squash_merge?: boolean;
    allow_merge_commit?: boolean;
    allow_rebase_merge?: boolean;
    delete_branch_on_merge?: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestBaseUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestBase = {
    label: string;
    ref: string;
    sha: string;
    user: WebhookPayloadPullRequestPullRequestBaseUser;
    repo: WebhookPayloadPullRequestPullRequestBaseRepo;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestHeadRepoOwner = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestHeadRepo = {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: WebhookPayloadPullRequestPullRequestHeadRepoOwner;
    html_url: string;
    description: null;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: null | string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url: null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: null;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    allow_squash_merge?: boolean;
    allow_merge_commit?: boolean;
    allow_rebase_merge?: boolean;
    delete_branch_on_merge?: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestHeadUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestHead = {
    label: string;
    ref: string;
    sha: string;
    user: WebhookPayloadPullRequestPullRequestHeadUser;
    repo: WebhookPayloadPullRequestPullRequestHeadRepo;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequestUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPullRequestPullRequest = {
    url: string;
    id: number;
    node_id: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    number: number;
    state: string;
    locked: boolean;
    title: string;
    user: WebhookPayloadPullRequestPullRequestUser;
    body: string;
    created_at: string;
    updated_at: string;
    closed_at: null | string;
    merged_at: null;
    merge_commit_sha: null | string;
    assignee: WebhookPayloadPullRequestPullRequestAssignee;
    assignees: Array<WebhookPayloadPullRequestPullRequestAssigneesItem>;
    requested_reviewers: Array<WebhookPayloadPullRequestPullRequestRequestedReviewersItem>;
    requested_teams: Array<any>;
    labels: Array<WebhookPayloadPullRequestPullRequestLabelsItem>;
    milestone: WebhookPayloadPullRequestPullRequestMilestone;
    commits_url: string;
    review_comments_url: string;
    review_comment_url: string;
    comments_url: string;
    statuses_url: string;
    head: WebhookPayloadPullRequestPullRequestHead;
    base: WebhookPayloadPullRequestPullRequestBase;
    _links: WebhookPayloadPullRequestPullRequestLinks;
    author_association: string;
    draft: boolean;
    merged: boolean;
    mergeable: null | boolean;
    rebaseable: null | boolean;
    mergeable_state: string;
    merged_by: null;
    comments: number;
    review_comments: number;
    maintainer_can_modify: boolean;
    commits: number;
    additions: number;
    deletions: number;
    changed_files: number;
  };
  /** @deprecated */
  type WebhookPayloadPullRequest = {
    action:
      | "assigned"
      | "closed"
      | "edited"
      | "labeled"
      | "locked"
      | "merged"
      | "opened"
      | "ready_for_review"
      | "reopened"
      | "review_request_removed"
      | "review_requested"
      | "synchronize"
      | "unassigned"
      | "unlabeled"
      | "unlocked";
    number: number;
    pull_request: WebhookPayloadPullRequestPullRequest;
    repository: PayloadRepository;
    sender: PayloadSender;
    assignee?: WebhookPayloadPullRequestAssignee;
    installation?: WebhookPayloadPullRequestInstallation;
    organization?: WebhookPayloadPullRequestOrganization;
    label?: WebhookPayloadPullRequestLabel;
  };
  /** @deprecated */
  type WebhookPayloadPublicInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadPublic = {
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadPublicInstallation;
  };
  /** @deprecated */
  type WebhookPayloadProjectInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadProjectProjectCreator = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadProjectProject = {
    owner_url: string;
    url: string;
    html_url: string;
    columns_url: string;
    id: number;
    node_id: string;
    name: string;
    body: string;
    number: number;
    state: string;
    creator: WebhookPayloadProjectProjectCreator;
    created_at: string;
    updated_at: string;
  };
  /** @deprecated */
  type WebhookPayloadProject = {
    action: "closed" | "created" | "deleted" | "edited" | "reopened";
    project: WebhookPayloadProjectProject;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadProjectInstallation;
  };
  /** @deprecated */
  type WebhookPayloadProjectColumnInstallation = {
    id: number;
    node_id: string;
  };
  /** @deprecated */
  type WebhookPayloadProjectColumnProjectColumn = {
    url: string;
    project_url: string;
    cards_url: string;
    id: number;
    node_id: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
  /** @deprecated */
  type WebhookPayloadProjectColumn = {
    action: "created" | "deleted" | "edited" | "moved";
    project_column: WebhookPayloadProjectColumnProjectColumn;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadProjectColumnInstallation;
  };
  /** @deprecated */
  type WebhookPayloadProjectCardOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
    name: string;
    company: null;
    blog: null;
    location: null;
    email: null;
    twitter_username: null;
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
    updated_at: string;
    type: string;
  };
  /** @deprecated */
  type WebhookPayloadProjectCardInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadProjectCardProjectCardCreator = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadProjectCardProjectCard = {
    url: string;
    project_url: string;
    column_url: string;
    column_id: number;
    id: number;
    node_id: string;
    note: string;
    archived: boolean;
    creator: WebhookPayloadProjectCardProjectCardCreator;
    created_at: string;
    updated_at: string;
  };
  /** @deprecated */
  type WebhookPayloadProjectCard = {
    action: "converted" | "created" | "deleted" | "edited" | "moved";
    project_card: WebhookPayloadProjectCardProjectCard;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadProjectCardInstallation;
    organization?: WebhookPayloadProjectCardOrganization;
  };
  /** @deprecated */
  type WebhookPayloadPingOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
  };
  /** @deprecated */
  type WebhookPayloadPingHookLastResponse = {
    code: null;
    status: string;
    message: null;
  };
  /** @deprecated */
  type WebhookPayloadPingHookConfig = {
    content_type: string;
    url: string;
    insecure_ssl: string;
    secret?: string;
  };
  /** @deprecated */
  type WebhookPayloadPingHook = {
    type: string;
    id: number;
    name: string;
    active: boolean;
    events: Array<string>;
    config: WebhookPayloadPingHookConfig;
    updated_at: string;
    created_at: string;
    url: string;
    test_url?: string;
    ping_url: string;
    last_response?: WebhookPayloadPingHookLastResponse;
  };
  /** @deprecated */
  type WebhookPayloadPing = {
    zen: string;
    hook_id: number;
    hook: WebhookPayloadPingHook;
    repository?: PayloadRepository;
    sender: PayloadSender;
    organization?: WebhookPayloadPingOrganization;
  };
  /** @deprecated */
  type WebhookPayloadPageBuildInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadPageBuildBuildPusher = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPageBuildBuildError = { message: null };
  /** @deprecated */
  type WebhookPayloadPageBuildBuild = {
    url: string;
    status: string;
    error: WebhookPayloadPageBuildBuildError;
    pusher: WebhookPayloadPageBuildBuildPusher;
    commit: string;
    duration: number;
    created_at: string;
    updated_at: string;
  };
  /** @deprecated */
  type WebhookPayloadPageBuild = {
    id: number;
    build: WebhookPayloadPageBuildBuild;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadPageBuildInstallation;
  };
  /** @deprecated */
  type WebhookPayloadPackagePackageRegistry = {
    about_url: string;
    name: string;
    type: string;
    url: string;
    vendor: string;
  };
  /** @deprecated */
  type WebhookPayloadPackagePackagePackageVersionAuthor = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPackagePackagePackageVersionPackageFilesItem = {
    download_url: string;
    id: number;
    name: string;
    sha256: string;
    sha1: string;
    md5: string;
    content_type: string;
    state: string;
    size: number;
    created_at: string;
    updated_at: string;
  };
  /** @deprecated */
  type WebhookPayloadPackagePackagePackageVersionReleaseAuthor = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPackagePackagePackageVersionRelease = {
    url: string;
    html_url: string;
    id: number;
    tag_name: string;
    target_commitish: string;
    name: string;
    draft: boolean;
    author: WebhookPayloadPackagePackagePackageVersionReleaseAuthor;
    prerelease: boolean;
    created_at: string;
    published_at: string;
  };
  /** @deprecated */
  type WebhookPayloadPackagePackagePackageVersion = {
    id: number;
    version: string;
    summary: string;
    body: string;
    body_html: string;
    release: WebhookPayloadPackagePackagePackageVersionRelease;
    manifest: string;
    html_url: string;
    tag_name: string;
    target_commitish: string;
    target_oid: string;
    draft: boolean;
    prerelease: boolean;
    created_at: string;
    updated_at: string;
    metadata: Array<any>;
    package_files: Array<WebhookPayloadPackagePackagePackageVersionPackageFilesItem>;
    author: WebhookPayloadPackagePackagePackageVersionAuthor;
    installation_command: string;
  };
  /** @deprecated */
  type WebhookPayloadPackagePackageOwner = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadPackagePackage = {
    id: number;
    name: string;
    package_type: string;
    html_url: string;
    created_at: string;
    updated_at: string;
    owner: WebhookPayloadPackagePackageOwner;
    package_version: WebhookPayloadPackagePackagePackageVersion;
    registry: WebhookPayloadPackagePackageRegistry;
  };
  /** @deprecated */
  type WebhookPayloadPackage = {
    action: "published" | "updated";
    package: WebhookPayloadPackagePackage;
    repository: PayloadRepository;
    sender: PayloadSender;
  };
  /** @deprecated */
  type WebhookPayloadOrgBlockInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadOrgBlockOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
  };
  /** @deprecated */
  type WebhookPayloadOrgBlockBlockedUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadOrgBlock = {
    action: "blocked" | "unblocked";
    blocked_user: WebhookPayloadOrgBlockBlockedUser;
    organization: WebhookPayloadOrgBlockOrganization;
    sender: PayloadSender;
    installation?: WebhookPayloadOrgBlockInstallation;
  };
  /** @deprecated */
  type WebhookPayloadOrganizationInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadOrganizationOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
  };
  /** @deprecated */
  type WebhookPayloadOrganizationMembershipUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadOrganizationMembership = {
    url: string;
    state: string;
    role: string;
    organization_url: string;
    user: WebhookPayloadOrganizationMembershipUser;
  };
  /** @deprecated */
  type WebhookPayloadOrganization = {
    action:
      | "deleted"
      | "member_added"
      | "member_invited"
      | "member_removed"
      | "renamed";
    membership: WebhookPayloadOrganizationMembership;
    organization: WebhookPayloadOrganizationOrganization;
    sender: PayloadSender;
    installation?: WebhookPayloadOrganizationInstallation;
  };
  /** @deprecated */
  type WebhookPayloadMilestoneInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadMilestoneMilestoneCreator = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadMilestoneMilestone = {
    url: string;
    html_url: string;
    labels_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    description: string;
    creator: WebhookPayloadMilestoneMilestoneCreator;
    open_issues: number;
    closed_issues: number;
    state: string;
    created_at: string;
    updated_at: string;
    due_on: string;
    closed_at: null | string;
  };
  /** @deprecated */
  type WebhookPayloadMilestone = {
    action: "closed" | "created" | "deleted" | "edited" | "opened";
    milestone: WebhookPayloadMilestoneMilestone;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadMilestoneInstallation;
  };
  /** @deprecated */
  type WebhookPayloadMetaHookConfig = {
    content_type: string;
    insecure_ssl: string;
    url: string;
  };
  /** @deprecated */
  type WebhookPayloadMetaHook = {
    type: string;
    id: number;
    name: string;
    active: boolean;
    events: Array<string>;
    config: WebhookPayloadMetaHookConfig;
    updated_at: string;
    created_at: string;
  };
  /** @deprecated */
  type WebhookPayloadMeta = {
    action: "deleted";
    hook_id: number;
    hook: WebhookPayloadMetaHook;
    repository: PayloadRepository;
    sender: PayloadSender;
  };
  /** @deprecated */
  type WebhookPayloadMembershipInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadMembershipOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
  };
  /** @deprecated */
  type WebhookPayloadMembershipTeam = {
    name: string;
    id: number;
    node_id: string;
    slug: string;
    description: string;
    privacy: string;
    url: string;
    html_url: string;
    members_url: string;
    repositories_url: string;
    permission: string;
  };
  /** @deprecated */
  type WebhookPayloadMembershipMember = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadMembership = {
    action: "added" | "removed";
    scope: string;
    member: WebhookPayloadMembershipMember;
    sender: PayloadSender;
    team: WebhookPayloadMembershipTeam;
    organization: WebhookPayloadMembershipOrganization;
    installation?: WebhookPayloadMembershipInstallation;
  };
  /** @deprecated */
  type WebhookPayloadMemberChangesPermission = { from: string };
  /** @deprecated */
  type WebhookPayloadMemberChanges = {
    permission: WebhookPayloadMemberChangesPermission;
  };
  /** @deprecated */
  type WebhookPayloadMemberInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadMemberMember = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadMember = {
    action: "added" | "edited" | "removed";
    member: WebhookPayloadMemberMember;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadMemberInstallation;
    changes?: WebhookPayloadMemberChanges;
  };
  /** @deprecated */
  type WebhookPayloadMarketplacePurchasePreviousMarketplacePurchasePlan = {
    id: number;
    name: string;
    description: string;
    monthly_price_in_cents: number;
    yearly_price_in_cents: number;
    price_model: string;
    has_free_trial: boolean;
    unit_name: string;
    bullets: Array<string>;
  };
  /** @deprecated */
  type WebhookPayloadMarketplacePurchasePreviousMarketplacePurchaseAccount = {
    type: string;
    id: number;
    login: string;
    organization_billing_email: string;
  };
  /** @deprecated */
  type WebhookPayloadMarketplacePurchasePreviousMarketplacePurchase = {
    account: WebhookPayloadMarketplacePurchasePreviousMarketplacePurchaseAccount;
    billing_cycle: string;
    on_free_trial: boolean;
    free_trial_ends_on: null;
    unit_count: number;
    plan: WebhookPayloadMarketplacePurchasePreviousMarketplacePurchasePlan;
  };
  /** @deprecated */
  type WebhookPayloadMarketplacePurchaseMarketplacePurchasePlan = {
    id: number;
    name: string;
    description: string;
    monthly_price_in_cents: number;
    yearly_price_in_cents: number;
    price_model: string;
    has_free_trial: boolean;
    unit_name: string | null;
    bullets: Array<string>;
  };
  /** @deprecated */
  type WebhookPayloadMarketplacePurchaseMarketplacePurchaseAccount = {
    type: string;
    id: number;
    node_id?: string;
    login: string;
    organization_billing_email: string;
  };
  /** @deprecated */
  type WebhookPayloadMarketplacePurchaseMarketplacePurchase = {
    account: WebhookPayloadMarketplacePurchaseMarketplacePurchaseAccount;
    billing_cycle: string;
    unit_count: number;
    on_free_trial: boolean;
    free_trial_ends_on: null;
    next_billing_date: string;
    plan: WebhookPayloadMarketplacePurchaseMarketplacePurchasePlan;
  };
  /** @deprecated */
  type WebhookPayloadMarketplacePurchaseSender = {
    login: string;
    id: number;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    email: string;
  };
  /** @deprecated */
  type WebhookPayloadMarketplacePurchase = {
    action:
      | "cancelled"
      | "changed"
      | "pending_change"
      | "pending_change_cancelled"
      | "purchased";
    effective_date: string;
    sender: WebhookPayloadMarketplacePurchaseSender;
    marketplace_purchase: WebhookPayloadMarketplacePurchaseMarketplacePurchase;
    previous_marketplace_purchase?: WebhookPayloadMarketplacePurchasePreviousMarketplacePurchase;
  };
  /** @deprecated */
  type WebhookPayloadLabelChangesColor = { from: string };
  /** @deprecated */
  type WebhookPayloadLabelChanges = { color: WebhookPayloadLabelChangesColor };
  /** @deprecated */
  type WebhookPayloadLabelInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadLabelLabel = {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
  };
  /** @deprecated */
  type WebhookPayloadLabel = {
    action: "created" | "deleted" | "edited";
    label: WebhookPayloadLabelLabel;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadLabelInstallation;
    changes?: WebhookPayloadLabelChanges;
  };
  /** @deprecated */
  type WebhookPayloadIssuesLabel = {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
  };
  /** @deprecated */
  type WebhookPayloadIssuesIssuePullRequest = {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
  };
  /** @deprecated */
  type WebhookPayloadIssuesOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
    name: string;
    company: null;
    blog: null;
    location: null;
    email: null;
    twitter_username: null;
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
    updated_at: string;
    type: string;
  };
  /** @deprecated */
  type WebhookPayloadIssuesInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadIssuesAssignee = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadIssuesChanges = {};
  /** @deprecated */
  type WebhookPayloadIssuesIssueMilestoneCreator = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadIssuesIssueMilestone = {
    url: string;
    html_url: string;
    labels_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    description: string;
    creator: WebhookPayloadIssuesIssueMilestoneCreator;
    open_issues: number;
    closed_issues: number;
    state: string;
    created_at: string;
    updated_at: string;
    due_on: string;
    closed_at: string;
  } | null;
  /** @deprecated */
  type WebhookPayloadIssuesIssueAssigneesItem = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadIssuesIssueAssignee = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  } | null;
  /** @deprecated */
  type WebhookPayloadIssuesIssueLabelsItem = {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
  };
  /** @deprecated */
  type WebhookPayloadIssuesIssueUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadIssuesIssue = {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    user: WebhookPayloadIssuesIssueUser;
    labels: Array<WebhookPayloadIssuesIssueLabelsItem>;
    state: string;
    locked: boolean;
    assignee: WebhookPayloadIssuesIssueAssignee;
    assignees: Array<WebhookPayloadIssuesIssueAssigneesItem>;
    milestone: WebhookPayloadIssuesIssueMilestone;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at: null;
    author_association: string;
    body: string;
    pull_request?: WebhookPayloadIssuesIssuePullRequest;
  };
  /** @deprecated */
  type WebhookPayloadIssues = {
    action:
      | "assigned"
      | "closed"
      | "deleted"
      | "demilestoned"
      | "edited"
      | "labeled"
      | "locked"
      | "milestoned"
      | "opened"
      | "pinned"
      | "reopened"
      | "transferred"
      | "unassigned"
      | "unlabeled"
      | "unlocked"
      | "unpinned";
    issue: WebhookPayloadIssuesIssue;
    changes?: WebhookPayloadIssuesChanges;
    repository: PayloadRepository;
    sender: PayloadSender;
    assignee?: WebhookPayloadIssuesAssignee;
    installation?: WebhookPayloadIssuesInstallation;
    organization?: WebhookPayloadIssuesOrganization;
    label?: WebhookPayloadIssuesLabel;
  };
  /** @deprecated */
  type WebhookPayloadIssueCommentChangesBody = { from: string };
  /** @deprecated */
  type WebhookPayloadIssueCommentChanges = {
    body: WebhookPayloadIssueCommentChangesBody;
  };
  /** @deprecated */
  type WebhookPayloadIssueCommentInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadIssueCommentOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
    name: string;
    company: null;
    blog: null;
    location: null;
    email: null;
    twitter_username: null;
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
    updated_at: string;
    type: string;
  };
  /** @deprecated */
  type WebhookPayloadIssueCommentCommentUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadIssueCommentComment = {
    url: string;
    html_url: string;
    issue_url: string;
    id: number;
    node_id: string;
    user: WebhookPayloadIssueCommentCommentUser;
    created_at: string;
    updated_at: string;
    author_association: string;
    body: string;
  };
  /** @deprecated */
  type WebhookPayloadIssueCommentIssueMilestoneCreator = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadIssueCommentIssueMilestone = {
    url: string;
    html_url: string;
    labels_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    description: string;
    creator: WebhookPayloadIssueCommentIssueMilestoneCreator;
    open_issues: number;
    closed_issues: number;
    state: string;
    created_at: string;
    updated_at: string;
    due_on: string;
    closed_at: string;
  };
  /** @deprecated */
  type WebhookPayloadIssueCommentIssueAssigneesItem = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadIssueCommentIssueAssignee = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadIssueCommentIssueLabelsItem = {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
  };
  /** @deprecated */
  type WebhookPayloadIssueCommentIssueUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadIssueCommentIssue = {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    user: WebhookPayloadIssueCommentIssueUser;
    labels: Array<WebhookPayloadIssueCommentIssueLabelsItem>;
    state: string;
    locked: boolean;
    assignee: WebhookPayloadIssueCommentIssueAssignee;
    assignees: Array<WebhookPayloadIssueCommentIssueAssigneesItem>;
    milestone: WebhookPayloadIssueCommentIssueMilestone;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at: null;
    author_association: string;
    body: string;
  };
  /** @deprecated */
  type WebhookPayloadIssueComment = {
    action: "created" | "deleted" | "edited";
    issue: WebhookPayloadIssueCommentIssue;
    comment: WebhookPayloadIssueCommentComment;
    repository: PayloadRepository;
    sender: PayloadSender;
    organization?: WebhookPayloadIssueCommentOrganization;
    installation?: WebhookPayloadIssueCommentInstallation;
    changes?: WebhookPayloadIssueCommentChanges;
  };
  /** @deprecated */
  type WebhookPayloadInstallationRepositoriesRepositoriesRemovedItem = {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
  };
  /** @deprecated */
  type WebhookPayloadInstallationRepositoriesRepositoriesAddedItem = {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
  };
  /** @deprecated */
  type WebhookPayloadInstallationRepositoriesInstallationPermissions = {
    administration?: string;
    statuses?: string;
    repository_projects?: string;
    repository_hooks?: string;
    pull_requests?: string;
    pages?: string;
    issues: string;
    deployments?: string;
    contents: string;
    checks?: string;
    metadata: string;
    vulnerability_alerts?: string;
  };
  /** @deprecated */
  type WebhookPayloadInstallationRepositoriesInstallationAccount = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadInstallationRepositoriesInstallation = {
    id: number;
    account: WebhookPayloadInstallationRepositoriesInstallationAccount;
    repository_selection: string;
    access_tokens_url: string;
    repositories_url: string;
    html_url: string;
    app_id: number;
    target_id: number;
    target_type: string;
    permissions: WebhookPayloadInstallationRepositoriesInstallationPermissions;
    events: Array<string>;
    created_at: number;
    updated_at: number;
    single_file_name: null | string;
  };
  /** @deprecated */
  type WebhookPayloadInstallationRepositories = {
    action: "added" | "removed";
    installation: WebhookPayloadInstallationRepositoriesInstallation;
    repository_selection: string;
    repositories_added: Array<WebhookPayloadInstallationRepositoriesRepositoriesAddedItem>;
    repositories_removed: Array<WebhookPayloadInstallationRepositoriesRepositoriesRemovedItem>;
    sender: PayloadSender;
  };
  /** @deprecated */
  type WebhookPayloadInstallationRepositoriesItem = {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
  };
  /** @deprecated */
  type WebhookPayloadInstallationInstallationPermissions = {
    metadata: string;
    contents: string;
    issues: string;
    administration?: string;
    checks?: string;
    deployments?: string;
    pages?: string;
    pull_requests?: string;
    repository_hooks?: string;
    repository_projects?: string;
    statuses?: string;
    vulnerability_alerts?: string;
  };
  /** @deprecated */
  type WebhookPayloadInstallationInstallationAccount = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadInstallationInstallation = {
    id: number;
    account: WebhookPayloadInstallationInstallationAccount;
    repository_selection: string;
    access_tokens_url: string;
    repositories_url: string;
    html_url: string;
    app_id: number;
    target_id: number;
    target_type: string;
    permissions: WebhookPayloadInstallationInstallationPermissions;
    events: Array<string>;
    created_at: number;
    updated_at: number;
    single_file_name: string | null;
  };
  /** @deprecated */
  type WebhookPayloadInstallation = {
    action:
      | "created"
      | "deleted"
      | "new_permissions_accepted"
      | "suspend"
      | "unsuspend";
    installation: WebhookPayloadInstallationInstallation;
    repositories: Array<WebhookPayloadInstallationRepositoriesItem>;
    sender: PayloadSender;
  };
  /** @deprecated */
  type WebhookPayloadGollumInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadGollumPagesItem = {
    page_name: string;
    title: string;
    summary: null;
    action: string;
    sha: string;
    html_url: string;
  };
  /** @deprecated */
  type WebhookPayloadGollum = {
    pages: Array<WebhookPayloadGollumPagesItem>;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadGollumInstallation;
  };
  /** @deprecated */
  type WebhookPayloadGithubAppAuthorization = {
    action: "revoked";
    sender: PayloadSender;
  };
  /** @deprecated */
  type WebhookPayloadForkInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadForkForkeeOwner = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadForkForkee = {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: WebhookPayloadForkForkeeOwner;
    html_url: string;
    description: null;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: null;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url: null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: null;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    public: boolean;
  };
  /** @deprecated */
  type WebhookPayloadFork = {
    forkee: WebhookPayloadForkForkee;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadForkInstallation;
  };
  /** @deprecated */
  type WebhookPayloadDeploymentStatusInstallation = {
    id: number;
    node_id: string;
  };
  /** @deprecated */
  type WebhookPayloadDeploymentStatusDeploymentCreator = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadDeploymentStatusDeploymentPayload = {};
  /** @deprecated */
  type WebhookPayloadDeploymentStatusDeployment = {
    url: string;
    id: number;
    node_id: string;
    sha: string;
    ref: string;
    task: string;
    payload: WebhookPayloadDeploymentStatusDeploymentPayload;
    original_environment: string;
    environment: string;
    description: null;
    creator: WebhookPayloadDeploymentStatusDeploymentCreator;
    created_at: string;
    updated_at: string;
    statuses_url: string;
    repository_url: string;
  };
  /** @deprecated */
  type WebhookPayloadDeploymentStatusDeploymentStatusCreator = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadDeploymentStatusDeploymentStatus = {
    url: string;
    id: number;
    node_id: string;
    state: string;
    creator: WebhookPayloadDeploymentStatusDeploymentStatusCreator;
    description: string;
    environment: string;
    target_url: string;
    created_at: string;
    updated_at: string;
    deployment_url: string;
    repository_url: string;
  };
  /** @deprecated */
  type WebhookPayloadDeploymentStatus = {
    action: "created";
    deployment_status: WebhookPayloadDeploymentStatusDeploymentStatus;
    deployment: WebhookPayloadDeploymentStatusDeployment;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadDeploymentStatusInstallation;
  };
  /** @deprecated */
  type WebhookPayloadDeploymentInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadDeploymentDeploymentCreator = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadDeploymentDeploymentPayload = {};
  /** @deprecated */
  type WebhookPayloadDeploymentDeployment = {
    url: string;
    id: number;
    node_id: string;
    sha: string;
    ref: string;
    task: string;
    payload: WebhookPayloadDeploymentDeploymentPayload;
    original_environment: string;
    environment: string;
    description: null;
    creator: WebhookPayloadDeploymentDeploymentCreator;
    created_at: string;
    updated_at: string;
    statuses_url: string;
    repository_url: string;
  };
  /** @deprecated */
  type WebhookPayloadDeployment = {
    action: "created";
    deployment: WebhookPayloadDeploymentDeployment;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadDeploymentInstallation;
  };
  /** @deprecated */
  type WebhookPayloadDeployKeyKey = {
    id: number;
    key: string;
    url: string;
    title: string;
    verified: boolean;
    created_at: string;
    read_only: boolean;
  };
  /** @deprecated */
  type WebhookPayloadDeployKey = {
    action: "created" | "deleted";
    key: WebhookPayloadDeployKeyKey;
    repository: PayloadRepository;
    sender: PayloadSender;
  };
  /** @deprecated */
  type WebhookPayloadDeleteOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
    name: string;
    company: null;
    blog: null;
    location: null;
    email: null;
    twitter_username: null;
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
    updated_at: string;
    type: string;
  };
  /** @deprecated */
  type WebhookPayloadDeleteInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadDelete = {
    ref: string;
    ref_type: string;
    pusher_type: string;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadDeleteInstallation;
    organization?: WebhookPayloadDeleteOrganization;
  };
  /** @deprecated */
  type WebhookPayloadCreateOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
    name: string;
    company: null;
    blog: null;
    location: null;
    email: null;
    twitter_username: null;
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
    updated_at: string;
    type: string;
  };
  /** @deprecated */
  type WebhookPayloadCreateInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadCreate = {
    ref: string;
    ref_type: string;
    master_branch: string;
    description: null;
    pusher_type: string;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation?: WebhookPayloadCreateInstallation;
    organization?: WebhookPayloadCreateOrganization;
  };
  /** @deprecated */
  type WebhookPayloadContentReferenceInstallation = {
    id: number;
    node_id: string;
  };
  /** @deprecated */
  type WebhookPayloadContentReferenceContentReference = {
    id: number;
    node_id: string;
    reference: string;
  };
  /** @deprecated */
  type WebhookPayloadContentReference = {
    action: "created";
    content_reference: WebhookPayloadContentReferenceContentReference;
    repository: PayloadRepository;
    sender: PayloadSender;
    installation: WebhookPayloadContentReferenceInstallation;
  };
  /** @deprecated */
  type WebhookPayloadCommitCommentInstallation = {
    id: number;
    node_id: string;
  };
  /** @deprecated */
  type WebhookPayloadCommitCommentOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
    name: string;
    company: null;
    blog: null;
    location: null;
    email: null;
    twitter_username: null;
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
    updated_at: string;
    type: string;
  };
  /** @deprecated */
  type WebhookPayloadCommitCommentCommentUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadCommitCommentComment = {
    url: string;
    html_url: string;
    id: number;
    node_id: string;
    user: WebhookPayloadCommitCommentCommentUser;
    position: null;
    line: null;
    path: null;
    commit_id: string;
    created_at: string;
    updated_at: string;
    author_association: string;
    body: string;
  };
  /** @deprecated */
  type WebhookPayloadCommitComment = {
    action: "created";
    comment: WebhookPayloadCommitCommentComment;
    repository: PayloadRepository;
    sender: PayloadSender;
    organization?: WebhookPayloadCommitCommentOrganization;
    installation?: WebhookPayloadCommitCommentInstallation;
  };
  /** @deprecated */
  type WebhookPayloadCodeScanningAlertInstallation = {
    id: number;
    node_id: string;
  };
  /** @deprecated */
  type WebhookPayloadCodeScanningAlertOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
  };
  /** @deprecated */
  type WebhookPayloadCodeScanningAlertAlertTool = {
    name: string;
    version: null;
  };
  /** @deprecated */
  type WebhookPayloadCodeScanningAlertAlertRule = {
    id: string;
    severity: string;
    description: string;
  };
  /** @deprecated */
  type WebhookPayloadCodeScanningAlertAlertInstancesItem = {
    ref: string;
    analysis_key: string;
    environment: string;
    state: string;
  };
  /** @deprecated */
  type WebhookPayloadCodeScanningAlertAlert = {
    number: number;
    created_at: string;
    url: string;
    html_url: string;
    instances: Array<WebhookPayloadCodeScanningAlertAlertInstancesItem>;
    state: string;
    dismissed_by: null;
    dismissed_at: null;
    dismissed_reason: null;
    rule: WebhookPayloadCodeScanningAlertAlertRule;
    tool: WebhookPayloadCodeScanningAlertAlertTool;
  };
  /** @deprecated */
  type WebhookPayloadCodeScanningAlert = {
    action:
      | "appeared_in_branch"
      | "closed_by_user"
      | "created"
      | "fixed"
      | "reopened"
      | "reopened_by_user";
    alert: WebhookPayloadCodeScanningAlertAlert;
    ref: string;
    commit_oid: string;
    repository: PayloadRepository;
    organization: WebhookPayloadCodeScanningAlertOrganization;
    installation?: WebhookPayloadCodeScanningAlertInstallation;
  };
  /** @deprecated */
  type WebhookPayloadCheckSuiteInstallation = { id: number; node_id: string };
  /** @deprecated */
  type WebhookPayloadCheckSuiteOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
    name: string;
    company: null;
    blog: null;
    location: null;
    email: null;
    twitter_username: null;
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
    updated_at: string;
    type: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckSuiteCheckSuiteHeadCommitCommitter = {
    name: string;
    email: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckSuiteCheckSuiteHeadCommitAuthor = {
    name: string;
    email: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckSuiteCheckSuiteHeadCommit = {
    id: string;
    tree_id: string;
    message: string;
    timestamp: string;
    author: WebhookPayloadCheckSuiteCheckSuiteHeadCommitAuthor;
    committer: WebhookPayloadCheckSuiteCheckSuiteHeadCommitCommitter;
  };
  /** @deprecated */
  type WebhookPayloadCheckSuiteCheckSuiteAppPermissions = {
    administration: string;
    checks: string;
    contents: string;
    deployments: string;
    issues: string;
    members: string;
    metadata: string;
    organization_administration: string;
    organization_hooks: string;
    organization_plan: string;
    organization_projects: string;
    organization_user_blocking: string;
    pages: string;
    pull_requests: string;
    repository_hooks: string;
    repository_projects: string;
    statuses: string;
    team_discussions: string;
    vulnerability_alerts: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckSuiteCheckSuiteAppOwner = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadCheckSuiteCheckSuiteApp = {
    id: number;
    node_id: string;
    owner: WebhookPayloadCheckSuiteCheckSuiteAppOwner;
    name: string;
    description: string;
    external_url: string;
    html_url: string;
    created_at: string;
    updated_at: string;
    permissions: WebhookPayloadCheckSuiteCheckSuiteAppPermissions;
    events: Array<any>;
  };
  /** @deprecated */
  type WebhookPayloadCheckSuiteCheckSuitePullRequestsItemBaseRepo = {
    id: number;
    url: string;
    name: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckSuiteCheckSuitePullRequestsItemBase = {
    ref: string;
    sha: string;
    repo: WebhookPayloadCheckSuiteCheckSuitePullRequestsItemBaseRepo;
  };
  /** @deprecated */
  type WebhookPayloadCheckSuiteCheckSuitePullRequestsItemHeadRepo = {
    id: number;
    url: string;
    name: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckSuiteCheckSuitePullRequestsItemHead = {
    ref: string;
    sha: string;
    repo: WebhookPayloadCheckSuiteCheckSuitePullRequestsItemHeadRepo;
  };
  /** @deprecated */
  type WebhookPayloadCheckSuiteCheckSuitePullRequestsItem = {
    url: string;
    id: number;
    number: number;
    head: WebhookPayloadCheckSuiteCheckSuitePullRequestsItemHead;
    base: WebhookPayloadCheckSuiteCheckSuitePullRequestsItemBase;
  };
  /** @deprecated */
  type WebhookPayloadCheckSuiteCheckSuite = {
    id: number;
    node_id: string;
    head_branch: string;
    head_sha: string;
    status: string;
    conclusion: string | null;
    url: string;
    before: string;
    after: string;
    pull_requests: Array<WebhookPayloadCheckSuiteCheckSuitePullRequestsItem>;
    app: WebhookPayloadCheckSuiteCheckSuiteApp;
    created_at: string;
    updated_at: string;
    latest_check_runs_count: number;
    check_runs_url: string;
    head_commit: WebhookPayloadCheckSuiteCheckSuiteHeadCommit;
  };
  /** @deprecated */
  type WebhookPayloadCheckSuite = {
    action: "completed" | "requested" | "rerequested";
    check_suite: WebhookPayloadCheckSuiteCheckSuite;
    repository: PayloadRepository;
    sender: PayloadSender;
    organization?: WebhookPayloadCheckSuiteOrganization;
    installation?: WebhookPayloadCheckSuiteInstallation;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunInstallation = { id: number; node_id: string };
  type PayloadRepositoryLicense = null | {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunRequestedAction = { identifier: string };
  /** @deprecated */
  type WebhookPayloadCheckRunOrganization = {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
    name?: string;
    company?: null;
    blog?: null;
    location?: null;
    email?: null;
    twitter_username?: null;
    is_verified?: boolean;
    has_organization_projects?: boolean;
    has_repository_projects?: boolean;
    public_repos?: number;
    public_gists?: number;
    followers?: number;
    following?: number;
    html_url?: string;
    created_at?: string;
    updated_at?: string;
    type?: string;
  };
  /** @deprecated */
  type PayloadSender = {
    login: string;
    id: number;
    node_id?: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    email?: string;
  };
  /** @deprecated */
  type PayloadRepositoryOwner = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name?: string;
    email?: string;
  };
  /** @deprecated */
  type PayloadRepository = {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: PayloadRepositoryOwner;
    html_url: string;
    description: null | string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string | number;
    updated_at: string;
    pushed_at: string | number;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: null | string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url: null;
    archived: boolean;
    disabled?: boolean;
    open_issues_count: number;
    license: PayloadRepositoryLicense;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    stargazers?: number;
    master_branch?: string;
    permissions?: PayloadRepositoryPermissions;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunPullRequestsItemBaseRepo = {
    id: number;
    url: string;
    name: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunPullRequestsItemBase = {
    ref: string;
    sha: string;
    repo: WebhookPayloadCheckRunCheckRunPullRequestsItemBaseRepo;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunPullRequestsItemHeadRepo = {
    id: number;
    url: string;
    name: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunPullRequestsItemHead = {
    ref: string;
    sha: string;
    repo: WebhookPayloadCheckRunCheckRunPullRequestsItemHeadRepo;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunPullRequestsItem = {
    url: string;
    id: number;
    number: number;
    head: WebhookPayloadCheckRunCheckRunPullRequestsItemHead;
    base: WebhookPayloadCheckRunCheckRunPullRequestsItemBase;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunAppPermissions = {
    administration?: string;
    checks: string;
    contents?: string;
    deployments?: string;
    issues?: string;
    members: string;
    metadata: string;
    organization_administration?: string;
    organization_hooks?: string;
    organization_plan?: string;
    organization_projects?: string;
    organization_user_blocking?: string;
    pages?: string;
    pull_requests: string;
    repository_hooks?: string;
    repository_projects?: string;
    statuses?: string;
    team_discussions?: string;
    vulnerability_alerts?: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunAppOwner = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunApp = {
    id: number;
    node_id: string;
    owner: WebhookPayloadCheckRunCheckRunAppOwner;
    name: string;
    description: string | null;
    external_url: string;
    html_url: string;
    created_at: string;
    updated_at: string;
    permissions?: WebhookPayloadCheckRunCheckRunAppPermissions;
    events?: Array<string>;
    slug?: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunCheckSuiteAppPermissions = {
    administration?: string;
    checks: string;
    contents?: string;
    deployments?: string;
    issues?: string;
    members: string;
    metadata: string;
    organization_administration?: string;
    organization_hooks?: string;
    organization_plan?: string;
    organization_projects?: string;
    organization_user_blocking?: string;
    pages?: string;
    pull_requests: string;
    repository_hooks?: string;
    repository_projects?: string;
    statuses?: string;
    team_discussions?: string;
    vulnerability_alerts?: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunCheckSuiteAppOwner = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunCheckSuiteApp = {
    id: number;
    node_id: string;
    owner: WebhookPayloadCheckRunCheckRunCheckSuiteAppOwner;
    name: string;
    description: string | null;
    external_url: string;
    html_url: string;
    created_at: string;
    updated_at: string;
    permissions?: WebhookPayloadCheckRunCheckRunCheckSuiteAppPermissions;
    events?: Array<string>;
    slug?: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunCheckSuitePullRequestsItemBaseRepo = {
    id: number;
    url: string;
    name: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunCheckSuitePullRequestsItemBase = {
    ref: string;
    sha: string;
    repo: WebhookPayloadCheckRunCheckRunCheckSuitePullRequestsItemBaseRepo;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunCheckSuitePullRequestsItemHeadRepo = {
    id: number;
    url: string;
    name: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunCheckSuitePullRequestsItemHead = {
    ref: string;
    sha: string;
    repo: WebhookPayloadCheckRunCheckRunCheckSuitePullRequestsItemHeadRepo;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunCheckSuitePullRequestsItem = {
    url: string;
    id: number;
    number: number;
    head: WebhookPayloadCheckRunCheckRunCheckSuitePullRequestsItemHead;
    base: WebhookPayloadCheckRunCheckRunCheckSuitePullRequestsItemBase;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunCheckSuite = {
    id: number;
    node_id?: string;
    head_branch: string;
    head_sha: string;
    status: string;
    conclusion: null | string;
    url: string;
    before: string;
    after: string;
    pull_requests: Array<WebhookPayloadCheckRunCheckRunCheckSuitePullRequestsItem>;
    app: WebhookPayloadCheckRunCheckRunCheckSuiteApp;
    created_at: string;
    updated_at: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRunOutput = {
    title: null | string;
    summary: null | string;
    text: null | string;
    annotations_count: number;
    annotations_url: string;
  };
  /** @deprecated */
  type WebhookPayloadCheckRunCheckRun = {
    id: number;
    node_id?: string;
    head_sha: string;
    external_id: string;
    url: string;
    html_url: string;
    details_url?: string;
    status: string;
    conclusion: null | string;
    started_at: string;
    completed_at: null | string;
    output: WebhookPayloadCheckRunCheckRunOutput;
    name: string;
    check_suite: WebhookPayloadCheckRunCheckRunCheckSuite;
    app: WebhookPayloadCheckRunCheckRunApp;
    pull_requests: Array<WebhookPayloadCheckRunCheckRunPullRequestsItem>;
  };
  /** @deprecated */
  type WebhookPayloadCheckRun = {
    action: "completed" | "created" | "requested_action" | "rerequested";
    check_run: WebhookPayloadCheckRunCheckRun;
    repository: PayloadRepository;
    sender: PayloadSender;
    organization?: WebhookPayloadCheckRunOrganization;
    requested_action?: WebhookPayloadCheckRunRequestedAction;
    installation?: WebhookPayloadCheckRunInstallation;
  };
}
