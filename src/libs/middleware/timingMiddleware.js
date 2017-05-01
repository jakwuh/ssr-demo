export function startTimer(req, res, next) {
    req.timings = {start: Date.now()};
    next();
}

export function endTimer(req, res, next) {
    console.info('Rendered in %s ms', Date.now() - req.timings.start);
    next();
}
