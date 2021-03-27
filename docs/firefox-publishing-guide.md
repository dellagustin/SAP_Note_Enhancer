# Firefox pulishing guide

This web extension (add-on) is self hosted for Firefox, as it was rejected in review due to not being for the general public.

The binaries are generated using the _web-ext_ tool with the `sign` command, and uploaded to the corresponding GitHub release.

The update manifest points to a raw file url on branch `updates-manifest`.

## Steps to update

1. Push the new version with a corresponding tag
1. Install the dev dependencies with the command
    ```
    npm install
    ```
1. Generate a new xpi signed file with the command
    ```
    npx web-ext sign -s ./extensionFiles
    ```
1. Create a release in GitHub and upload the generated file
1. Update the updates manifest with new version and update link

## References

- [Firefox Add-on Self-distribution](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/#self-distribution)
- [Browser Extensions browser_specific_settings](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings)
- [Updating your extension - update manifest](https://extensionworkshop.com/documentation/manage/updating-your-extension/)
- [web-ext on GitHub](https://github.com/mozilla/web-ext)
- [web-ext command reference](https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#web-ext-sign)