# docker-tools

These scripts are quick hacks for getting data about docker images/containers.
They're a work-in-progress, and mostly used right now for troubleshooting issues
with the Docker daemon when its internal layers db gets out of sync with what's
on disk.

## Installation

Clone this repo and run `npm install`.

## Usage

`node troubleshoot.js <image hash>`

Image hashes can be the whole string, with or without the `sha256` prefix, or
just a few characters. The scripts use regular expressions to walk the Docker
image tree, so the more specific you are the less likely you are to get false
matches.

