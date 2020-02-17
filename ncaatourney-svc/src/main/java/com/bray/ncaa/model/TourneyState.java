package com.bray.ncaa.model;

/**
 * Enum to determine state of the tournament.
 * ENTER_PICKS - Admin needs to enter the available picks.
 * USER_PICKS - Users can make picks.
 * TOURNEY - All picks locked. Tournament has started.
 */
public enum TourneyState {
    ADMIN_PICKS,
    USER_PICKS,
    TOURNEY
}
