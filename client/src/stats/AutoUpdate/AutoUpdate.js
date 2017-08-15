import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { mapPropsStream, compose, createEventHandler } from 'recompose';
import { Observable } from 'rxjs/Rx';

import { getTickerLoading } from '../stats.selectors';
import { loadTickerStart } from '../stats.duck';
import { Button } from '../Button';

const mapStateToProps = (state) => ({
    loading: getTickerLoading(state),
});

const { handler: start, stream: start$ } = createEventHandler();
const { handler: stop, stream: stop$ } = createEventHandler();

const mapDispatchToProps = (dispatch) => ({
    refresh: () => dispatch(loadTickerStart()),
    start,
    stop,
});

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    mapPropsStream(
        prop$ => prop$
            .combineLatest(
                Observable.merge(
                    Observable.from(start$).map(() => 'start').startWith('noop'),
                    Observable.from(stop$).map(() => 'stop'),
                ),
                Observable.from(start$)
                    .switchMap(() => Observable.interval(1000).takeUntil(stop$))
                    .startWith(-1),
            )
            // wow, this sucks :(
            .scan((acc, [props, op, interval]) => {
                const { op: prevOp, seconds: prevSeconds, counter: prevCounter } = acc;
                let seconds = prevSeconds;
                let counting = op === 'start';
                const startingSeconds = 300;

                if (op !== prevOp && (op === 'start' || op === 'stop')) {
                    seconds = startingSeconds;
                } else if (counting && prevCounter !== interval) {
                    seconds = prevSeconds - 1;

                    if (seconds < 0) {
                        seconds = startingSeconds;

                        if (!props.loading) {
                            props.refresh();
                        }
                    }
                }


                return {
                    ...props,
                    op,
                    seconds,
                    counting,
                    counter: interval,
                };
            }, {})
    ),
);

const AutoUpdate = ({ counting, seconds, start, stop}) => {
    const action = counting ? stop : start;
    const label = counting ? seconds : 'start';

    return (
        <div>
            <Button onClick={action}>{label}</Button>
        </div>
    );
};

export default enhance(AutoUpdate);
