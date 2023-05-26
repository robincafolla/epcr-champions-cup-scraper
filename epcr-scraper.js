// copyright Robin Cafolla
// Licenced under GNU Affero General Public License v3
// see LICENCE.md
//
// run in console
// on https://www.epcrugby.com/champions-cup/matches/
// tested in Firefox
(() => {
  const findParent = (el, className) => {
    let parent = el.parentElement;
    while(parent !== document) {
      if (parent.classList.contains(className)) {
        return parent;
      }

      parent = parent.parentElement;
    }
    return null;
  };

  const rows = [
    ...window.document.getElementsByClassName('fixResults-fixtures'),
    ...window.document.getElementsByClassName('fixtureList-mainFix'),
  ];
  const results = [];

  for(const el of rows) {
    const teamANameEl = el.querySelectorAll('.fix-results-teamA-name .long-name');
    const teamBNameEl = el.querySelectorAll('.fix-results-teamB-name .long-name');

    let teamAName, teamBName;
    if (teamANameEl.length === 0 || teamBNameEl.length === 0) {
      console.log('no teams', el);
    } else {
      teamAName = teamANameEl[0].innerText.trim();
      teamBName = teamBNameEl[0].innerText.trim();
    }

    const scoreAEl = el.querySelectorAll('.fix-results-score .teamA-score');
    const scoreBEl = el.querySelectorAll('.fix-results-score .teamB-score');

    let scoreA = null;
    let scoreB = null;
    if (scoreAEl.length === 0 || scoreBEl.length === 0) {
      console.log('no scores', el);
      continue;
    } else {
      scoreA = scoreAEl[0].innerText.trim();
      scoreB = scoreBEl[0].innerText.trim();
    }

    let date = null;
    const parentContainer = (el.classList.contains('fixtureList-mainFix')) 
      ? el 
      : findParent(el, 'fixtureList-mainFix');
    if (parentContainer !== null) {
      date = parentContainer.querySelector('.c-primary').innerText.trim()
        .replaceAll(/(\\n)|(\n)/g, '')
        .replaceAll(/( +)/g, ' ');
    }

		let result = null;
    let winner = null;
    if (scoreA > scoreB) {
      result = 'HOME_WIN';
      winner = teamAName;
    } else if (scoreB > scoreA) {
      result = 'AWAY_WIN';
      winner = teamBName;
    } else {
      result = 'DRAW';
    }

    let pool = null;
    const poolEl = el.querySelector('.fixtureInfo-top .info-pool');
    if (poolEl) {
      pool = poolEl.innerText.trim()
        .replaceAll(/(\\n)|(\n)/g, '')
        .replaceAll(/( +)/g, ' ');
    }

    let venue = null;
    const venueEl = el.querySelector('.fixtureInfo-top .info-venue');
    if (venueEl) {
      venue = venueEl.innerText.trim()
        .replaceAll(/(\\n)|(\n)/g, '')
        .replaceAll(/( +)/g, ' ');
    }


    results.push({
      date,
      pool, 
      venue,
      teamA: teamAName,
      teamB: teamBName,
      result,
      winner,
      score: [ scoreA, scoreB ]
    });
  }
  console.log(rows.length);
  console.log(JSON.stringify(results, true, 2));
})()
