class MyPromise {
    status: string; // Promise当前的状态
    data: any;      //// Promise的值
    onResolvedCallbacks: Function[];
    onRejectedCallbacks: Function[];

    constructor(executor: Function) {
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (e) {
            this.reject(e);
        }
    }

    private resolve(value: any) {
        setTimeout(() => {
            if (this.status === 'pending') {
                this.status = 'resolved';
                this.data = value;

                for (let callback of this.onResolvedCallbacks) {
                    callback(value);
                }
            }
        });
    }

    private reject(reason: any) {
        setTimeout(() => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.data = reason;

                for (let callback of this.onResolvedCallbacks) {
                    callback(reason);
                }
            }
        });
    }

    private then(onResolve: Function, onReject: Function) {
        this.onResolvedCallbacks.push(onResolve);
        this.onRejectedCallbacks.push(onReject);
    }
}