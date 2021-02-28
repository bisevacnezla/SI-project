
export function AZSortObrnut(niz){
    console.log("uspjesno");
    niz.sort(function(a,b){
        if(a.sticky === b.sticky) {
            var textA = a.title.toUpperCase();
            var textB = b.title.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        } else if (a.sticky){
            return -1;
        }
        else if (b.sticky){
            return 1;
        }
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return niz;
}

export function AZSort (niz) {
    console.log("uspjelo");
    niz.sort(function(a,b){
        if(a.sticky === b.sticky) {
            var textA = a.title.toUpperCase();
            var textB = b.title.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        } else if (a.sticky){
            return -1;
        }
        else if (b.sticky){
            return 1;
        }
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return niz;
}

export function KomentariSort(niz){
    niz.sort(function(a,b){
        if(a.sticky === b.sticky) {
            var textA = a.brojKomentara
            var textB = b.brojKomentara
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        } else if (a.sticky){
            return -1;
        }
        else if (b.sticky){
            return 1;
        }
        var textA = a.brojKomentara
        var textB = b.brojKomentara
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return niz;
}

export function KomentariSortObrnut(niz){
    niz.sort(function(a,b){
        if(a.sticky === b.sticky) {
            var textA = a.brojKomentara
            var textB = b.brojKomentara
            return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
        } else if (a.sticky){
            return -1;
        }
        else if (b.sticky){
            return 1;
        }
        var textA = a.brojKomentara
        var textB = b.brojKomentara
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
    });
    return niz;
}

export function VrijemeSortObrnut(niz){
    niz.sort(function(a,b){
        if(a.sticky === b.sticky) {
            var textA = a.timeCreated;
            var textB = b.timeCreated;
            return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
        } else if (a.sticky){
            return -1;
        }
        else if (b.sticky){
            return 1;
        }
                 
                  var textA = a.timeCreated;
                  var textB = b.timeCreated;
                  return (textA > textB) ? -1 : (textA <textB) ? 1 : 0;
                });
                return niz;
}

export function VrijemeSort (niz){
    niz.sort(function(a,b){
        if(a.sticky === b.sticky) {
            var textA = a.timeCreated;
            var textB = b.timeCreated;
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        } else if (a.sticky){
            return -1;
        }
        else if (b.sticky){
            return 1;
        }
                 
                  var textA = a.timeCreated;
                  var textB = b.timeCreated;
                  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                return niz;
}

export function AZSortObrnutKom(niz){
    niz.sort(function(a,b){
      var textA = a.text.toUpperCase();
      var textB = b.text.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return niz;
}

export function AZSortKom (niz) {
    niz.sort(function(a,b){
      var textA = a.text.toUpperCase();
      var textB = b.text.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return niz;
}