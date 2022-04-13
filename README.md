# Pixie

Web interface for managing PXE booted clients


## THIS BRANCH IS HERE TO SOLVE A WEIRD DISPLAY ISSUE

To reproduce the issue:
```
docker-compose build && docker-compose up -d
```

Then navigate to `localhost:8880` to see the issue.

The bordered `div` should be adjusting its height to its contents, but it isn't. Changing the `font-size` of any children doesn't make the container element grow any larger, almost as if the children are positioned `absolute`ly or `float`ed.

For a minimal example of how the element *should* look, see: `working-example.html`
