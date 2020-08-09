/** make trial permutations
 * @returns {number} */
function calc_nperm(ivs) {
    let nperm = 1;
    for (key in ivs) nperm *= ivs[key].length;
    return nperm;
}

/** make trial permutations
 * @returns {Array} */
function permu_trials(ivs, nt) {
    let nperm = calc_nperm(ivs);
    if (nt % nperm) throw "Number of trials is not permutation of IVs";
    let trials = new Array(nt);
    for (let ti = 0; ti < trials.length; ti++) {
        let carry = ti;
        trials[ti] = {};
        for (key in ivs) {
            let nl = ivs[key].length;
            let remainder = carry % nl;
            trials[ti][key] = ivs[key][remainder];
            carry -= remainder;
            carry /= nl;
        }
    }
    return trials;
}

/** gen trials, support practice trials and shuffled
 * @returns {Array} */
function gen_trials(ivs, nt, npt = 0) {
    let nperm = calc_nperm(ivs);

    let ptrials = [];
    if (npt > 0) {
        let nptcarry = npt;
        if (nptcarry % nperm);
        nptcarry += nperm - npt % nperm;
        ptrials = permu_trials(ivs, nptcarry);
        shuffle(ptrials);
        ptrials = ptrials.slice(0, npt);
        ptrials.forEach(function (trial, ti) { trial.ti = ti - npt; });
    }
    let trials = permu_trials(ivs, nt);
    shuffle(trials);
    trials.forEach(function (trial, ti) { trial.ti = ti; });
    return ptrials.concat(trials);
}