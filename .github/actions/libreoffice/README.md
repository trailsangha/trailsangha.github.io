
# Run command in a LibreOffice Docker image

Run commands with `libreoffice` commandline available in a Docker container.

We just want basic functionality, but you can load fonts, etc into the container, and do _a lot_ more.  LibreOffice can convert markdown to PDF, etc...  You can find github actions in the marketplace to do fancier stuff.

## Inputs

## `command`

**Required** Command to run.

## Example usage

uses: ./.github/actions/libreoffice
with:
  command: libreoffice --headless --invisible --convert-to csv 'myfile.ods'  --outdir 'out'


uses: ./.github/actions/libreoffice
with:
  command: libreoffice --headless --invisible --convert-to csv 'myfile.ods'  --outdir 'out'
  command: libreoffice --headless --invisible --convert-to pdf 'myfile.ods'  --outdir 'pdf'

