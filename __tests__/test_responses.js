let crime = {
    category: "anti-social-behaviour",
    persistent_id: "",
    location_type: "Force",
    location_subtype: "",
    id: 20599642,
    location: {
        latitude: "52.6269479",
        longitude: "-1.1121716",
        street: {
            id: 882380,
            name: "On or near Cedar Road"
        },
    },
    context: "",
    month: "2013-01",
    outcome_status: null
}

let crimes = [
    Object.assign({}, crime),
    Object.assign({}, crime),
    Object.assign({}, crime)
]

export default {
    crime,
    crimes
}
