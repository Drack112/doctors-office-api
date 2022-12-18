#!/bin/bash

dockerize -wait tcp://mysql:3306 -timeout 120s .docker/entrypoint.sh

