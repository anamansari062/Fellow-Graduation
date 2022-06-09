use anchor_lang::prelude::*;

declare_id!("AxhFHpAQtpQag1uZQpjeKxf51YDvt1UgPMiYYcGCKnCR");

// Add some useful constants for sizing propeties.
const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_NAME_LENGTH: usize = 30 * 4; // 30 chars max.
const MAX_GITHUB_USERNAME_LENGTH: usize = 39 * 4; // 39 chars max.
const MAX_POD_NUMBER_LENGTH: usize = 12 * 4; // 12 chars max.
const MAX_POD_NAME_LENGTH: usize = 30 * 4; // 30 chars max.
const MAX_PROJECT_LENGTH: usize = 50 * 4; // 50 chars max.
const MAX_PICTURE_LINK_LENGTH: usize = 120 * 4; // 120 chars max.
// const MAX_TOKEN_LENGTH: usize = 44 * 4; // 44 chars max.

impl Fellow {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_NAME_LENGTH // Name.
        + STRING_LENGTH_PREFIX + MAX_GITHUB_USERNAME_LENGTH // Github username.
        + STRING_LENGTH_PREFIX + MAX_POD_NUMBER_LENGTH // Pod number.
        + STRING_LENGTH_PREFIX + MAX_POD_NAME_LENGTH // Pod Name.
        + STRING_LENGTH_PREFIX + MAX_PROJECT_LENGTH // Project Length.
        + STRING_LENGTH_PREFIX + MAX_PICTURE_LINK_LENGTH; // Picture Link Length.
        // + STRING_LENGTH_PREFIX + MAX_TOKEN_LENGTH; // Token Length.
}


#[program]
pub mod solana_program {
    use super::*;

    pub fn send_fellow(ctx: Context<SendFellow>, name: String, github_username: String, pod_number: String, pod_name: String, project: String, picture_link: String) -> Result<()> {
    let fellow: &mut Account<Fellow> = &mut ctx.accounts.fellow;
        let author: &Signer = &ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();

        if name.chars().count() < 1 {
            return Err(error!(ErrorCode::NameEmpty))
        }

        if name.chars().count() > 30 {
            return Err(error!(ErrorCode::NameTooLong))
        }

        if github_username.chars().count() < 1 {
            return Err(error!(ErrorCode::GithubUsernameEmpty))
        }

        if github_username.chars().count() > 39 {
            return Err(error!(ErrorCode::GithubUsernameTooLong))
        }

        if pod_number.chars().count() < 1 {
            return Err(error!(ErrorCode::PodNumberEmpty))
        }

        if pod_number.chars().count() > 12 {
            return Err(error!(ErrorCode::PodNumberTooLong))
        }

        if pod_name.chars().count() < 1 {
            return Err(error!(ErrorCode::PodNameEmpty))
        }

        if pod_name.chars().count() > 30 {
            return Err(error!(ErrorCode::PodNameTooLong))
        }

        if project.chars().count() < 1 {
            return Err(error!(ErrorCode::ProjectTooLong))
        }

        if project.chars().count() > 50 {
            return Err(error!(ErrorCode::ProjectEmpty))
        }

        fellow.author = *author.key;
        fellow.timestamp = clock.unix_timestamp;
        fellow.name = name;
        fellow.github_username = github_username;
        fellow.pod_number = pod_number;
        fellow.pod_name = pod_name;
        fellow.project = project;
        fellow.picture_link = picture_link;
        // fellow.token = token;

        Ok(())
    }
}

#[account]
pub struct Fellow {
    pub author: Pubkey,
    pub timestamp: i64,
    pub name: String,
    pub github_username: String,
    pub pod_number: String,
    pub pod_name: String,
    pub project: String,
    pub picture_link: String,
    // pub token: String,
}

#[derive(Accounts)]
pub struct SendFellow<'info> {
    #[account(init, payer = author, space = Fellow::LEN)]
    pub fellow: Account<'info, Fellow>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}


#[error_code]
pub enum ErrorCode {
    #[msg("The provided name should be 30 characters long maximum.")]
    NameTooLong,
    #[msg("The provided github username should be 39 characters long maximum.")]
    GithubUsernameTooLong,
    #[msg("The provided pod number should be 12 characters long maximum.")]
    PodNumberTooLong,
    #[msg("The provided pod name should be 30 characters long maximum.")]
    PodNameTooLong,
    #[msg("The provided project should be 50 characters long maximum.")]
    ProjectTooLong,
    #[msg("Name cannot not be empty.")]
    NameEmpty,
    #[msg("Github Username cannot be empty.")]
    GithubUsernameEmpty,
    #[msg("Pod Number cannot not be empty.")]
    PodNumberEmpty,
    #[msg("Pod Name cannot not be empty.")]
    PodNameEmpty,
    #[msg("Project cannot be empty.")]
    ProjectEmpty
}
