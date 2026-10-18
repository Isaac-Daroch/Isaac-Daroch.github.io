# Operation, update, recovery and publication

## Normal operation

Production serves static files. It does not depend on Isaac's laptop remaining connected. The visitor can read content without 3D; JavaScript is necessary only for interactive controls. The local preview binds to loopback. Stop it with Ctrl+C; never kill unrelated Node processes to free a port without identifying them.

## A failed build

A renderer failure, missing required file, unknown output or manifest mismatch prevents acceptance. The notebook is rendered from explicit source inputs in a new staging directory. Promotion records state and keeps a previous tree until verification succeeds. A `.previous` directory or unexplained build lock requires reviewing `.build/research-journal.json` and confirming no build is active. Do not delete recovery markers blindly.

## Updating the existing Windows checkout

The extracted source ZIP includes package-manifest.json. ACTUALIZAR-WEB.ps1 launches a Node transaction after validating the entire archive. Check the displayed machine and destination, stop the preview and close editors, then confirm ACTUALIZAR. Source preparation and checks run outside the destination. The transaction inventories originals and writes the journal before the first rename. Only names listed by the validated package are managed; .git is never part of the replacement set. Dependency binaries are omitted from promotion and can be reinstalled from the lock.

Backups are stored under the parent Projects directory in `_web_backups/Isaac-Daroch.github.io/<timestamp>`. Journal, originals and quarantined content are operational assets, not files to commit or publish. There is no automatic backup deletion policy.

## Restoration

Run RESTABLECER-WEB.ps1 with the recorded backup directory. Confirm the printed destination and RESTAURAR. The procedure first verifies all recoverable originals, then moves newer entries to a quarantine folder and restores original hashes. A corrupted backup aborts before live restoration. Keep quarantine until the recovered application and local modifications have been reviewed. A second user should eventually perform the handover exercise; automated fault tests do not replace that usability assessment.

## Release and public verification

A release ties source commit, lockfile, actual toolchain and artifact content digest. Verify the combined dist before uploading. Publish from main through an explicit workflow, not on every content change. Restrict Pages/OIDC privileges to the deploy job. After publishing, compare the public release.json to the tested artifact, load the principal routes and verify a missing route returns 404. Revert to the prior known-good source/artifact on failure rather than editing production files manually.

## Incidents and ownership

The repository owner is the maintainer and publication approver. There is no visitor administration panel. Contact channels are links only. Keep secrets out of code and logs; imported episode files are never uploaded. Investigate dependency audit findings in context, do not claim a zero advisory count proves absence of vulnerabilities.
