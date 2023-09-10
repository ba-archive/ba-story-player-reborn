declare module "nprogress" {
    export as namespace NProgress;
    function configure(config: any);
    function start();
    function done();
    function isStarted(): boolean;
}
