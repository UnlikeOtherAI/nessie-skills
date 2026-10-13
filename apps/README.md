# App catalogue source material

This directory reserves a home for public, nonsecret MCP app descriptions and
captured instruction/capability metadata. It contains no executable MCP servers,
connection credentials, installation scripts or fabricated capability snapshots.

The initial catalogue has **zero app manifests**. Version 1 accepts skills only;
`catalog.json` must contain `apps: []`. Nessie's existing Apps catalogue and its
superuser editing workflow supply live app records independently.

An app contribution currently starts with an issue describing the use case,
source, license and proposed nonsecret snapshot. A maintainer must establish the
supported snapshot and import contract before a manifest can be accepted. A
directory name or repository merge never authorizes connecting to an endpoint,
executing a server, or assigning a checked badge.
